
window.oncontextmenu = function(mousePos) {
	console.log('contextmenu!');
	var p = {clientX: mousePos.clientX, clientY: mousePos.clientY};
	var msg = {point: p, from: 'contextmenu'};
	chrome.runtime.sendMessage(msg, function(response) {});
};

/*
//$(document).ready(function(){//var sidebar = $("<div>ALL YOUR BASE ARE BELONG TO US</div>");
$("html").addClass("tagit_padding");
//var sidebar = $("<div>ALL YOUR BASE ARE BELONG TO US</div>");
var sidebar = $("<div></div>");
sidebar.addClass("tagit_sidebar");
$("body").append(sidebar);
*/
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
/*
		var thumbnail = $("<div>A</div>");
		thumbnail.addClass("comment_thumbnail");
		thumbnail.attr("data-comment-id",comment_id);
		thumbnail.offset({top: comment.y});
		thumbnail.click({comment_id: comment_id}, onCommentThumbnailClick);
		sidebar.append(thumbnail);
*/
	});
});
/*
var toggleSidebar = function() {
	console.log("toggle");
	$("html").toggleClass("tagit_padding");
	$(".tagit_sidebar").toggle();
	$(".comment").hide();
	$(".tagit_background").toggle();
};*/

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
	if(request.hide_all) {
		//toggleSidebar();
		sendResponse();
	}
});

function overlay() {
	var $wraper = $('<div></div>');
	var $background = $('<div></div>');
	var $body = $(document.body);

	/*
	$.get('http//tagitserver.herokuapp.com/list_tags_by_url/http%3A%2F%2Fduckduckgo.com', function(){
		alert('regarde dans ta console');
		console.dir(data);
	});
	*/

	$background.on('click', function() {
		$background.toggleClass('tagit_wall');
	});

	$body.addClass('tagit_body');
	$wraper.addClass('tagit_wraper');
	$background.addClass('tagit_background');

	console.log("send message");
	chrome.runtime.sendMessage(
		{ getTags: true},
		function(tags) {
			console.log("response" + tags);
			for(var i in tags) {
				$background.append($(tags[i]));
			}
		});

	$body.prepend($background);
	$body.wrapInner($wraper);

	// Stylises the injected HTML
	chrome.runtime.sendMessage({
		css: {
			file: "style.css",
		}
	}, function(response) {
		console.log(response.state);
	});
}

function addStyle() {
	// Stylises the injected HTML
	chrome.runtime.sendMessage({
		css: {
			file: "style.css",
		}
	}, function(response) {
		console.log(response.state);
	});
}

function sidebar() {

	$("html").addClass("tagit_padding");

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
			comment_el.addClass("tagit_comment");
			comment_el.attr("id",comment_id);
			comment_el.offset({left: comment.x, top: comment.y});
			comment_el.hide();
			comment_el.children(".close").click(onCommentClose);
			$("body").append(comment_el);

			var thumbnail = $("<div>A</div>");
			thumbnail.addClass("tagit_comment_thumbnail");
			thumbnail.attr("data-comment-id",comment_id);
			thumbnail.offset({top: comment.y});
			thumbnail.click({comment_id: comment_id}, onCommentThumbnailClick);
			sidebar.append(thumbnail);
		});
	});

	function toggleSidebar() {
		console.log("toggle");
		$("html").toggleClass("tagit_padding");
		$(".tagit_sidebar").toggle();
		$(".tagit_comment").hide();
		$(".tagit_background").toggle();
	};

	chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
		console.log("message");
		if(request.hide_all) {
			console.log("hide all");
			toggleSidebar();
			sendResponse();
		}
	});
}

overlay();
addStyle();
