/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/snapshots              ->  index
 */

'use strict';

var request = require("request");
var fs = require('fs');
var stream = require('stream');

// Gets a list of Snapshots
export function index(req, res) {
  var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
  fs.writeFile("out.png", base64Data, 'base64', function(err) {
    console.log(err); 
    var options = { 
      method: 'POST',
      url: 'http://api.sightcorp.com/api/detect/',
      formData: 
      { //client_id: 'c900cd6d5cff4b6db8473600e0b62152',
        //client_id: '0b6646bbe77245df9f4216e2d7e6e658',
        // client_id: 'c4eec4618eb54bd5ab4a05dd6bbd0bf9',
        client_id: 'a3a39f179e8340d3ad50e480fb04bb27',
        //app_key: 'ff06c8d1ae0e44aba2b0bb414a845024',
        //app_key: 'd41e229c1ce34bf895b6a17df2dc9525',
        // app_key: '919a4d659a97479b8bfc0de1aa2d8efe',
        app_key:'67d7699139fe428a83b8575901cfcd38',
        img: fs.createReadStream("out.png")
      } 
    };
    console.log("here");
    request(options, function (error, response, body) {
      if (error) return res.json({error: error});
      console.log(body);
      res.json(JSON.parse(body));
    });
  });

}
