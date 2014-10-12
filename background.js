function onClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

console.log("initialize background");

chrome.contextMenus.removeAll();
chrome.contextMenus.create({"title": "Tag it!", "onclick":onClick});


var comments = [
  {
    id: 1,
    text: 'Un comm',
    x: 50,
    y: 150
  },
  {
    id: 2,
    text: 'Un autre comm',
    x: 150,
    y: 250
  }
];

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("button clicked")
	chrome.tabs.sendMessage(tab.id,{hide_all:true},function(response) {
    console.log("response");
	});
});

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
  if(request.css) {
    chrome.tabs.insertCSS(sender.tab.id,request.css);
    sendResponse({state:'css loaded'});
  }
  if(request.getComments) {
    sendResponse({comments: comments});
  }
});
