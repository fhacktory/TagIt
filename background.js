function onClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

console.log("initialise background");

chrome.contextMenus.removeAll();
chrome.contextMenus.create({"title": "Tag it!", "onclick":onClick});

