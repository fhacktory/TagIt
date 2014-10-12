var request = require('request');
request.post(
  //'http://0.0.0.0:3000/tags',
  'http://tagitserver.herokuapp.com/tags',
//  { form: { url:"abcdef", content:"pouet"}},
  { form: { url:"http://www.phonations.com", content:"<div>a div</div>"}},
  function(error, response, body) {
    if(!error && response.statusCode == 200) {
      console.log(body);
    }
  }
);

