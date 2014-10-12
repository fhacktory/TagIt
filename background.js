
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
  console.log("Right click : " + coords);
  chrome.tabs.sendMessage(tab.id, {create_new_tag: true, p: gPos}, function(response) {

  });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id,{hide_all:true},function(response) {
    console.log("response");
  });
});

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
console.log("background get message:" + request);
  if(request.css) {
    chrome.tabs.insertCSS(sender.tab.id,request.css);
    sendResponse({state:'css loaded'});
  }
  if(request.getTags) {
    console.log("get tags");
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
      var url = tabs[0].url;
      console.log(url);
      $.post(
        'http://tagitserver.herokuapp.com/list_tags_by_url',
        { url:url},
        function(data) {
          console.log(data);
          var tags = [];
          data.forEach(function(obj) {
            tags.push(obj.content);
          });
          console.log(tags);
          chrome.tabs.sendMessage(tabs[0].id, {tags: tags});
        }
      );
    });
  }
  if(request.getComments) {
    sendResponse({comments: comments});
  }
  if(request.add_tag_to_database) {
    var newTag = $("<div><button class=\"close\">X</button><p>"+request.newTagText+"</p></div>");
    newTag.addClass("tagit_comment");
    newTag.offset({left: request.newTagCoord.x, top: request.newTagCoord.y});
    newTag.children(".close").click(onCommentClose);

    console.log("add tag to database:" + newTag.outerHTML);
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
      var url = tabs[0].url;
      console.log(url);
      $.post(
        'http://tagitserver.herokuapp.com/tags',
        { url:url, content: newTag.outerHTML},
        function(data) {
          console.log(data);
        }
      );
    });
    sendResponse({ok: true, newTag: newTag.outerHTML});
  }
});

function onCommentClose(ev) {
  var comment = $(ev.target).parent();
  comment.toggle();
};
