chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if(changeInfo.url == "chrome://newtab/")
    chrome.tabs.create({ url: chrome.runtime.getURL("contents/thanosGame.html") });
});
