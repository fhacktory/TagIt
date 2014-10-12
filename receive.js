var request = require('request');
request.post(
//  'http://0.0.0.0:3000/list_tags_by_url',
  'http://tagitserver.herokuapp.com/list_tags_by_url',
//  { form: { url:"abcdef"}},
  { form: { url:"http://www.phonations.com"}},
  function(error, response, body) {
    if(!error && response.statusCode == 200) {
      console.log(body);
    }
  }
);

setTimeout(function() {
      console.log('Blah blah blah blah extra-blah');
}, 3000);
