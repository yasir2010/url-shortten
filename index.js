var express = require('express');
var path = require('path');

var Bitly = require('bitly');
var bitly = new Bitly('309694309e3eaaf6e6f256dcacc789969e280290');


var app = express();

app.get('/',function(req, res){
	res.sendFile(path.join(__dirname+'/ind_ex.html'));
});

app.get('/urlshorten/*',function(req,res){
	var original_url;
	var shoetened_url;

	console.log(req.params[0]);
	var given_url = req.params[0];
	var check_url = /^(http:\/\/)(...\.)\w+\.\w+$/gi;
	if(check_url.test(given_url)){
		console.log('url pass test');
		bitly.shorten(given_url)
		  .then(function(response) {
		    shoetened_url = response.data.url;
		    original_url = response.data.long_url;
		    console.log(response);

		    res.json({proivded_url : original_url, short_url : shoetened_url});
		    //res.end();
		  }, function(error) {
		    throw error;
		  });		
	}
	else{
		//res.end('{Error:Please provide url in the following format \n http://www.example.com}');
		var Erro = 'Please provide url in this format  http://www.example.com';
		original_url = given_url;
		res.json({Erro});
	}
	
});

app.listen(process.env.PORT || 3000);