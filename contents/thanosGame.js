var activated = 0;
var thanos_power = 2;
var thanos_vacation = 100;
var ironman_love = 3000;

var inputs = ['up', 'down', 'left', 'right', 'space'];
var pos = 0;
var commandNum = 1;
var images = [];

function preload() {
  for (var i = 0; i < arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
  }
}

preload(
  "../media/left.png",
  "../media/right.png",
  "../media/up.png",
  "../media/down.png",
  "../media/space.png",
  "../media/thanoshit.png",
)

chrome.storage.local.get(['activated', 'thanos_power', 'thanos_vacation', 'ironman_love', 'date', 'inevitable', 'autoplay'],
  function(result){
    var inevitable = 0;
    thanos_power = result.thanos_power;
    thanos_vacation = result.thanos_vacation;
    ironman_love = result.ironman_love;
    autoplay = result.autoplay;
    thanos_power *= 1;
    thanos_vacation *= 1;
    ironman_love *= 1;
    autoplay *= 1;
    activated = result.activated;
    inevitable = result.inevitable;
    if(!result.hasOwnProperty('thanos_power'))
      thanos_power = 3;
    if(!result.hasOwnProperty('thanos_vacation'))
      thanos_vacation = 30;
    if(!result.hasOwnProperty('ironman_love'))
      ironman_love = 3;
    if(!result.hasOwnProperty('activated'))
      activated = 1;
    if(!result.hasOwnProperty('inevitable'))
      inevitable = 0;
    if(!result.hasOwnProperty('autoplay')){
      chrome.storage.local.set({'autoplay': 1});
      autoplay = 1;
    }
    console.log(activated);
    date = result.date;
    console.log((new Date()).getTime() - date);
    console.log(thanos_vacation * 60 * 1000);

    if(!result.hasOwnProperty('date') || (new Date()).getTime() - date >= (thanos_vacation * 60 * 1000)){
      activated = 1;
      chrome.storage.local.set({'activated': 1});
    }
    else{
      activated = 0;
      chrome.storage.local.set({'activated': 0});
    }

    console.log(result);


    if(activated == 0){
      document.getElementById("background").style.backgroundImage = "url(../media/sleepingThanos.png)";
      document.getElementById("background").style.backgroundRepeat = "no-repeat";
      document.getElementById("bgmplayer").autoplay = 0;
    }
    else{
      document.getElementById("bgmplayer").autoplay = autoplay;
      if(inevitable == 1){
        chrome.storage.local.set({'inevitable': 0});
        document.getElementById("message_eng").innerHTML = "I am inevitable.";
        document.getElementById("message_kor").innerHTML = "나는 필연적이다.";
      }

      commandNum = 5 * thanos_power + getRandomIntInclusive(-1, 1);

      var timeleft = 100; // 10 sec
      var downloadTimer = setInterval(function(){
        document.getElementById("progressBar").value = 100 - timeleft;
        timeleft -= 1;
        if(timeleft <= 0){
          if(pos != commandNum){
            document.getElementById('cmd').innerHTML = "dead"
            document.getElementById("thanos").style.backgroundImage = "url('../media/1_thanos_paint.png')";
            pos = commandNum;
            setTimeout(snapTabs, 1000);
          }
          clearInterval(downloadTimer);
        }
      }, 100);

      var commands = [];
      for(var i = 0; i < commandNum; ++i)
        commands[i] = getRandomIntInclusive(0, inputs.length - 1);

      printCommands(commands);

      document.addEventListener('keyup', (e) => {
        if(pos == commandNum)
          return;
        
        //document.getElementById("iron_man").style.backgroundImage = "url('../media/1_iron\ man.png')";
        
        var keyCode = -1;
        if (e.code === "ArrowUp")        keyCode = 0;
        else if (e.code === "ArrowDown") keyCode = 1;
        else if (e.code === "ArrowLeft") keyCode = 2;
        else if (e.code === "ArrowRight") keyCode = 3;
        else if (e.code === "Space") keyCode = 4;

        if(keyCode == -1)
          return;

        if(commands[pos] == keyCode){
          pos++;
          if(pos == commandNum){
            outputString = "Done!";
            clearInterval(downloadTimer);
            chrome.storage.local.set({'activated': 0});
            chrome.storage.local.set({'date': (new Date()).getTime() });
            document.getElementById("bgmplayer").pause();
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL("chrome://newtab") });
          }
          else{
            document.getElementById("img_grid").children[pos-1].style.visibility = 'hidden';
            document.getElementById("thanos").style.backgroundImage = "url('../media/thanoshit.png')";
          }
        }
        else{
          outputString = "dead";
          document.getElementById("thanos").style.backgroundImage = "url('../media/1_thanos_paint.png')";
          pos = commandNum;
          clearInterval(downloadTimer);
          setTimeout(snapTabs, 1000);
        }

        document.getElementById('cmd').innerHTML = outputString;
      });
      document.addEventListener('keydown', (e) => {
        if(pos == commandNum){
          return;
        }
        var keyCode = -1;
        var keyCode = -1;
        if (e.code === "ArrowUp")        keyCode = 0;
        else if (e.code === "ArrowDown") keyCode = 1;
        else if (e.code === "ArrowLeft") keyCode = 2;
        else if (e.code === "ArrowRight") keyCode = 3;
        else if (e.code === "Space") keyCode = 4;

        if(keyCode == -1)
          return;

        switch(keyCode){
          case 0:
            document.getElementById("iron_man").style.backgroundImage = "url('../media/up.png')";
            break;
          case 1:
            document.getElementById("iron_man").style.backgroundImage = "url('../media/down.png')";
            break;
          case 2:
            document.getElementById("iron_man").style.backgroundImage = "url('../media/left.png')";
            break;
          case 3:
            document.getElementById("iron_man").style.backgroundImage = "url('../media/right.png')";
            break;
          case 4:
            document.getElementById("iron_man").style.backgroundImage = "url('../media/space.png')";
            break;
          default:
            console.log("error");
            break;
        }
      });
    }
});

function printCommands(commands){
  var cmdString = "";
  cmdString += `
    <main class="grid" id="img_grid">
  `;
  for(var i = 0; i < commands.length; ++i){
    if(commands[i] == 0)
      cmdString += `
        <img src="../media/1_command_arrow.png" alt="" style="transform:rotate(180deg) ">
        `;
    else if(commands[i] == 1)
      cmdString += `
        <img src="../media/1_command_arrow.png" alt="">
        `;
    else if(commands[i] == 2)
        cmdString += `
          <img src="../media/1_command_arrow.png" alt="" style="transform:rotate(90deg) ">
          `;
    else if(commands[i] == 3)
        cmdString += `
        <img src="../media/1_command_arrow.png" alt="" style="transform:rotate(270deg) ">
        `;
    else
      cmdString += `
        <img src="../media/1_command_space.png" alt="">
        `;
  }
  cmdString +=`
    </main>
  `;

  document.getElementById("cmd").innerHTML = cmdString;
}

window.addEventListener("beforeunload", function(event) {
  if(activated == 1 && pos != commandNum){
    chrome.storage.local.set({'inevitable': 1});
    chrome.tabs.create({});
  }
});

function snapTabs(){
  chrome.tabs.query({}, function (tabs) {
    tabNum = tabs.length;
    shuffledIdx = shuffle([...Array(tabs.length).keys()]);
    snappedTabs = [];
    for(var i = 0; i < Math.floor((tabNum+1) / 2); ++i){
      snappedTabs[i] = tabs[shuffledIdx[i]].id;
    }
    chrome.tabs.remove(snappedTabs);
    chrome.storage.local.set({'activated': 0});
    chrome.storage.local.set({'date': (new Date()).getTime() });
    document.getElementById("bgmplayer").pause();
  });
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
