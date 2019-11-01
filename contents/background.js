chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if(changeInfo.url == "chrome://newtab/"){
    chrome.storage.local.get(['activated', 'thanos_vacation', 'date'],
      function(result){
        thanos_vacation = result.thanos_vacation;
        thanos_vacation *= 1;
        activated = result.activated;
        if(!result.hasOwnProperty('thanos_vacation'))
          thanos_vacation = 30;
        if(!result.hasOwnProperty('activated'))
          activated = 1;
        date = result.date;

        if(!result.hasOwnProperty('date') || (new Date()).getTime() - date >= (thanos_vacation * 60 * 1000)){
          activated = 1;
          chrome.storage.local.set({'activated': 1});
        }
        else{
          activated = 0;
          chrome.storage.local.set({'activated': 0});
        }
        if(activated)
          chrome.tabs.update(tabId, { url: chrome.runtime.getURL("contents/thanosGame.html") });
      }
    );
  }
});
