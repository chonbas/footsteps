	var request = require('request');

	var headers = {
		'Origin': 'http://face.sightcorp.com',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language': 'en-US,en;q=0.8,es;q=0.6,nb;q=0.4,it;q=0.2',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
		'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryminkRtJJXEfegNDe',
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Referer': 'http://face.sightcorp.com/doc_swagger/',
		'Connection': 'keep-alive'
	};

	var dataString = '$------WebKitFormBoundaryminkRtJJXEfegNDe\r\nContent-Disposition: form-data; name="client_id"\r\n\r\n0b6646bbe77245df9f4216e2d7e6e658\r\n------WebKitFormBoundaryminkRtJJXEfegNDe\r\nContent-Disposition: form-data; name="app_key"\r\n\r\nd41e229c1ce34bf895b6a17df2dc9525\r\n------WebKitFormBoundaryminkRtJJXEfegNDe\r\nContent-Disposition: form-data; name="url"\r\n\r\nhttp://epicwellnessvt.com/files/2014/06/Happy-Person-at-Work.jpg\r\n------WebKitFormBoundaryminkRtJJXEfegNDe\r\nContent-Disposition: form-data; name="max_persons"\r\n\r\n1\r\n------WebKitFormBoundaryminkRtJJXEfegNDe\r\nContent-Disposition: form-data; name="img"\r\n\r\nundefined\r\n------WebKitFormBoundaryminkRtJJXEfegNDe--\r\n';

	var options = {
		url: 'https://api.sightcorp.com/api/detect/',
		method: 'POST',
		headers: headers,
		body: dataString
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
		}
    else {
      console.log(error);
    }
	}

  request(options, callback);
