var request = require('request');
request.post(
//'http://0.0.0.0:3000/tags',
'http://tagitserver.herokuapp.com/tags',
//  { form: { url:"abcdef", content:"pouet"}},
{ form: { url:"http://www.windowsphone.com/fr-FR", content:'<img src="http://i.imgur.com/R63r9Fd.png" style="position: absolute;top: -2px;left: 263px;width: 621px;height: auto;">'}},
function(error, response, body) {
	if(!error && response.statusCode == 200) {
	console.log(body);
	}
}
);

request.post(
//'http://0.0.0.0:3000/tags',
'http://tagitserver.herokuapp.com/tags',
//  { form: { url:"abcdef", content:"pouet"}},
{ form: { url:"http://fhacktory.com/", content:'<img src="http://i.imgur.com/cPWnAjq.png" style=" width: 109%; bottom: 810px; position: absolute; z-index: 100000; left: -76px;" />'}},
function(error, response, body) {
	if(!error && response.statusCode == 200) {
	console.log(body);
	}
}
);
