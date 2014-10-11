var sidebar = $("<div>ALL YOUR BASE ARE BELONG TO US</div>");
sidebar.addClass("tagit_sidebar");
$("body").append(sidebar);

var comment = $("<div>Commentaire Test</div>");
comment.addClass("comment");
comment.offset({left: 50, top: 150});
$("body").append(comment);

// Stylises the injected HTML
chrome.runtime.sendMessage({
	css: {
		file: "sidebar.css"
	}
}, function(response) {
	console.log(response.state);
});
