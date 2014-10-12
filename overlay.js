	var $wraper = $('<div></div>');
	var $background = $('<div></div>');
	var $body = $(document.body);

/*
	$.get('http//tagitserver.herokuapp.com/list_tags_by_url/http%3A%2F%2Fduckduckgo.com', function(){
		alert('regarde dans ta console');
		console.dir(data);
	});
*/

	var $comments = [
		$('<p class="tagit_tag" data-x="10px" data-y="1px">Have an octotastic day ;-)</p>'),
		$('<p class="tagit_tag" data-x="1px" data-y="10px">All your base are belong to us</p>'),
		$('<p class="tagit_tag" data-x="1px" data-y="20px">Up up down down left right left right b a start</p>'),
		$('<p class="tagit_tag" data-x="20px" data-y="1px">You just lost thug aim</p>')
	];

	$background.on('click', function() {
		$background.toggleClass('tagit_wall');
	});

	$body.addClass('tagit_body');
	$wraper.addClass('tagit_wraper');
	$background.addClass('tagit_background');

	for (var i in $comments) {
		$background.append($comments[i]);
	}

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
