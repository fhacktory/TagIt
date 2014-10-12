
window.oncontextmenu = function(mousePos) {
	console.log('contextmenu!');
	var p = {x: mousePos.clientX, y: mousePos.clientY};
	var msg = {point: p, from: 'contextmenu'};
	chrome.runtime.sendMessage(msg, function(response) {});
};

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
	if(request.hide_all) {
		//toggleSidebar();
		sendResponse();
	}
	else if(request.add_comment) {
		var editor = $('<div><input type="text"/></div>');
		editor.addClass("tagit_editor");
		editor.offset({left: request.p.x, top: request.p.y});
		editor.children('input').keypress(function(ev) {
			if(ev.which == 13) {
				ev.preventDefault();
				$(ev.target).blur();
			}
		});
		editor.children('input').blur(function(ev) {
			var val = $(ev.target).val();
			if(val.length > 0) {
				var comment = {id: 3, text: val, x: request.p.x, y: request.p.y};
				chrome.runtime.sendMessage({
					add_comment: true,
					comment: comment
				}, function(response) {
					if(response.ok) {
						editor.remove();
						showComment(response.comment);
					}
				});
			}
		});
		$("body").append(editor);
		editor.children('input').focus();
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

function onCommentClose(ev) {
	var comment = $(ev.target).parent();
	comment.toggle();
};
function showComment(comment) {

	var comment_id = "tagit_comment_"+comment.id;
	var comment_el = $("<div><button class=\"close\">X</button><p>"+comment.text+"</p></div>");
	comment_el.addClass("tagit_comment");
	comment_el.attr("id",comment_id);
	comment_el.offset({left: comment.x, top: comment.y});
	comment_el.children(".close").click(onCommentClose);
	$("body").append(comment_el);
}
function showComments() {

	chrome.runtime.sendMessage({
		getComments: true
	}, function(response) {
		$.each(response.comments, function(index,comment) {
			showComment(comment);
		});
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

//overlay();
showComments();
addStyle();
