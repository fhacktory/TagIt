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
