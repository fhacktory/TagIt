
console.log("initialize background");

gPos = null;
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.from == 'contextmenu') {
		//storing position
		gPos = msg.point;
	}
});

chrome.contextMenus.removeAll();
chrome.contextMenus.create({id: '1',title: 'Tag it!'},function() {
	console.log(chrome.runtime.lastError);	
});

chrome.contextMenus.onClicked.addListener(function(info,tab) {
	// coordinates are here!
	var coords = gPos;
});


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
