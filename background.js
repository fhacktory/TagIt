
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

comments = [
  {
    id: 0,
    text: 'Un comm',
    x: 50,
    y: 150
  },
  {
    id: 1,
    text: 'Un autre comm',
    x: 150,
    y: 250
  }
];

chrome.contextMenus.onClicked.addListener(function(info,tab) {
	// coordinates are here!
	var coords = gPos;
	console.log(coords);
	chrome.tabs.sendMessage(tab.id, {add_comment: true, p: gPos}, function(response) {
		
	});
});

chrome.browserAction.onClicked.addListener(function(tab) {
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
	if(request.add_comment) {
		var max_id = comments.length;
		var comment = request.comment;
		comment.id = max_id;
		comments[max_id] = comment;
		sendResponse({ok: true, comment: comment});
	}
});
