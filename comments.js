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

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
	if(request.getComments) {
		sendResponse({comments: comments});
	}
});
