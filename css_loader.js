chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
	if(request.css) {
		chrome.tabs.insertCSS(sender.tab.id,request.css);
		sendResponse({state:'css loaded'});
	}
});
