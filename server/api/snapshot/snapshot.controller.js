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
      { client_id: '0b6646bbe77245df9f4216e2d7e6e658',
        app_key: 'd41e229c1ce34bf895b6a17df2dc9525',
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
