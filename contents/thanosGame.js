var commandNum = 10;
var inputs = ['up', 'down', 'left', 'right', 'space'];
var pos = 0;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

var timeleft = 100; // 10 sec
var downloadTimer = setInterval(function(){
  document.getElementById("progressBar").value = 100 - timeleft;
  timeleft -= 1;
  if(timeleft <= 0){
    if(pos != commandNum){
      document.getElementById('h1_text').innerHTML = "dead"
      pos = commandNum;
    }
    clearInterval(downloadTimer);
  }
}, 100);

var commands = [];
for(var i = 0; i < commandNum; ++i)
  commands[i] = getRandomIntInclusive(0, inputs.length - 1);

var outputString = inputs[commands[0]];
for(var i = 1; i < commandNum; ++i)
  outputString += " " + inputs[commands[i]];

document.getElementById("h1_text").innerHTML = outputString;

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

  document.getElementById('h1_text').innerHTML = outputString;
});

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
