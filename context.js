//$(document).ready(function(){//var sidebar = $("<div>ALL YOUR BASE ARE BELONG TO US</div>");
$("html").addClass("tagit_padding");

//var sidebar = $("<div>ALL YOUR BASE ARE BELONG TO US</div>");
var sidebar = $("<div></div>");
sidebar.addClass("tagit_sidebar");
$("body").append(sidebar);

var onCommentThumbnailClick = function(ev) {
	var comment = $("#"+ev.data.comment_id);
	comment.toggle();
};
var onCommentClose = function(ev) {
	var comment = $(ev.target).parent();
	comment.toggle();
}

chrome.runtime.sendMessage({
	getComments: true
}, function(response) {
	$.each(response.comments, function(index,comment) {
		var comment_id = "tagit_comment_"+comment.id;
		var comment_el = $("<div><button class=\"close\">X</button><p>"+comment.text+"</p></div>");
		comment_el.addClass("comment");
		comment_el.attr("id",comment_id);
		comment_el.offset({left: comment.x, top: comment.y});
		comment_el.hide();
		comment_el.children(".close").click(onCommentClose);
		$("body").append(comment_el);

		var thumbnail = $("<div>A</div>");
		thumbnail.addClass("comment_thumbnail");
		thumbnail.attr("data-comment-id",comment_id);
		thumbnail.offset({top: comment.y});
		thumbnail.click({comment_id: comment_id}, onCommentThumbnailClick);
		sidebar.append(thumbnail);
	});
});

// Stylises the injected HTML
chrome.runtime.sendMessage({
	css: {
		file: "sidebar.css",
	}
}, function(response) {
	console.log(response.state);
});

var toggleSidebar = function() {
	console.log("toggle");
	$("html").toggleClass("tagit_padding");
	$(".tagit_sidebar").toggle();
	$(".comment").hide();
	$(".tagit_background").toggle();
};

console.log("sidebar.js");
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
	console.log("message");
	if(request.hide_all) {
		console.log("hide all");
		toggleSidebar();
		sendResponse();
	}
});


var $wraper = $('<div></div>');
var $background = $('<div></div>');
var $body = $(document.body);

var $comments = [
	$('<p class="tagit_tag">Have an octotastic day ;-)</p>'),
	$('<p class="tagit_tag">All your base are belong to us</p>'),
	$('<p class="tagit_tag">Up up down down left right left right b a start</p>'),
	$('<p class="tagit_tag">You just lost thug aim</p>')
];

for (var i in $comments) {
	$background.append($comments[i]);
}

// Stylises the injected HTML
chrome.runtime.sendMessage({
	css: {
		file: "overlay.css"
	}
}, function(response) {
	console.log(response.state);
});

$body.addClass('tagit_body');

$wraper.addClass('tagit_wraper');
$body.wrapInner($wraper);

$background.addClass('tagit_background');
$body.append($background);
