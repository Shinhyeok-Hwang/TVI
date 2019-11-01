var activated = 0;
var thanos_power = 2;
var thanos_vacation = 100;
var ironman_love = 3000;

var inputs = ['up', 'down', 'left', 'right', 'space'];

chrome.storage.local.get(['activated', 'thanos_power', 'thanos_vacation', 'ironman_love'],
  function(result){
    activated = result.activated;
    thanos_power = result.thanos_power;
    thanos_vacation = result.thanos_vacation;
    ironman_love = result.ironman_love;
    console.log(result);

    if(activated == 0){
      document.getElementById("background").style.backgroundImage = "url(../media/sleepingThanos.png)";
      document.getElementById("background").style.backgroundRepeat = "no-repeat";
    }
    else{
      var commandNum = 5 * thanos_power + getRandomIntInclusive(-1, 1);
      var pos = 0;

      var timeleft = 100; // 10 sec
      var downloadTimer = setInterval(function(){
        document.getElementById("progressBar").value = 100 - timeleft;
        timeleft -= 1;
        if(timeleft <= 0){
          if(pos != commandNum){
            document.getElementById('cmd').innerHTML = "dead"
            pos = commandNum;
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
          }
          else{
            var outputString = inputs[commands[pos]];
            for(var i = pos+1; i < commandNum; ++i)
              outputString += " " + inputs[commands[i]];
          }
        }
        else{
          outputString = "dead";
          pos = commandNum;
          clearInterval(downloadTimer);
          setTimeout(snapTabs, 1000);
        }

        document.getElementById('cmd').innerHTML = outputString;
      });
    }
});

function printCommands(commands){
  var cmdString = "";
  cmdString += `
    <main class="grid">
  `;
  for(var i = 0; i < commands.length; ++i){
    if(commands[i] != 4)
      cmdString += `
        <img src="../media/1_command_arrow.png" alt="">
        `;
    else
      cmdString += `
        <img src="../media/1_command_space.png" alt="">
        `;
  }
  cmdString +=`
    </main>
  `;

  console.log(cmdString);
  document.getElementById("cmd").innerHTML = cmdString;
}

function snapTabs(){
  chrome.tabs.query({}, function (tabs) {
    tabNum = tabs.length;
    shuffledIdx = shuffle([...Array(tabs.length).keys()]);
    snappedTabs = [];
    for(var i = 0; i < Math.floor((tabNum+1) / 2); ++i){
      snappedTabs[i] = tabs[shuffledIdx[i]].id;
    }
    chrome.tabs.remove(snappedTabs);
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
