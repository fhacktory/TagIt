function onClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

console.log("initialize background");

chrome.contextMenus.removeAll();
chrome.contextMenus.create({"title": "Tag it!", "onclick":onClick});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id,{hide_all:true},function(response) {
	});
});
