function toggleSidebar() {
	console.log("toggle");
	$(".tagit_comment").toggle();
	$(".tagit_background").toggle();
}

window.oncontextmenu = function(mousePos) {
	console.log('contextmenu!');
	var p = {x: mousePos.clientX, y: mousePos.clientY};
	var msg = {point: p, from: 'contextmenu'};
	chrome.runtime.sendMessage(msg, function(response) {});
};

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
	console.log("context get message:" + request);
	if(request.hide_all) {
		toggleSidebar();
		sendResponse();
	}
	else if(request.create_new_tag) {
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
			console.log("new tag created:" + ev.target);
			var val = $(ev.target).val();
			console.log(val);
			if(val.length > 0) {
				var newTag = "<div class=\"tagit_comment\" style=\"top:" + request.p.y + "px; left:" + request.p.x + "px;\">"+val+"</div>";

				console.log(newTag);

				chrome.runtime.sendMessage({
					add_tag_to_database: true,
					newTag: newTag
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
	} else if(request.tags) {
		console.log("response");
		for(var i in request.tags) {
			$('.tagit_background').append($(request.tags[i]));
		}
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

	$body.addClass('tagit_body');
	$wraper.addClass('tagit_wraper');
	$background.addClass('tagit_background');
	$background.addClass('tagit_wall');

	console.log("get the tags from the background");
	chrome.runtime.sendMessage({getTags: true});

	$body.prepend($background);
	$body.wrapInner($wraper);
	setTimeout(toggleSidebar, 350);
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

function showComment(comment_el) {
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

overlay();
//showComments();
addStyle();
