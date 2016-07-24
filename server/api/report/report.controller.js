/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reports              ->  index
 */

'use strict';

// Gets a list of Reports
export function index(req, res) {
  var plotly = require('plotly')("fidelss", "xab1vpca34");
  var baselineEmotions = [
  {
    "sadness": 51.33333333,
    "neutral": 0,
    "disgust": 6,
    "anger": 1.666666667,
    "surprise": 5,
    "fear": 14.33333333,
    "happiness": 1.666666667
  },
  {
    "sadness": 16.33333333,
    "neutral": 0,
    "disgust": 2,
    "anger": 2.666666667,
    "surprise": 24.66666667,
    "fear": 24.33333333,
    "happiness": 1.333333333
  },
  {
    "sadness": 16.66666667,
    "neutral": 0,
    "disgust": 2.333333333,
    "anger": 3.666666667,
    "surprise": 10.66666667,
    "fear": 37,
    "happiness": 0.333333333
  },
  {
    "sadness": 17.66666667,
    "neutral": 0,
    "disgust": 3,
    "anger": 7,
    "surprise": 13.33333333,
    "fear": 27.66666667,
    "happiness": 0.666666667
  },
  {
    "sadness": 9,
    "neutral": 0,
    "disgust": 3.666666667,
    "anger": 2.333333333,
    "surprise": 29.66666667,
    "fear": 32,
    "happiness": 1.666666667
  },
  {
    "sadness": 13.33333333,
    "neutral": 0,
    "disgust": 5.333333333,
    "anger": 7.333333333,
    "surprise": 13.33333333,
    "fear": 36.33333333,
    "happiness": 1.666666667
  },
  {
    "sadness": 29.33333333,
    "neutral": 0,
    "disgust": 2.333333333,
    "anger": 5,
    "surprise": 9,
    "fear": 28.33333333,
    "happiness": 0.666666667
  },
  {
    "sadness": 26,
    "neutral": 0,
    "disgust": 5.666666667,
    "anger": 10.66666667,
    "surprise": 8,
    "fear": 29,
    "happiness": 1.333333333
  },
  {
    "sadness": 10.66666667,
    "neutral": 0,
    "disgust": 4,
    "anger": 3.333333333,
    "surprise": 22.33333333,
    "fear": 41.66666667,
    "happiness": 2.666666667
  },
  {
    "sadness": 8.666666667,
    "neutral": 0,
    "disgust": 1,
    "anger": 4.666666667,
    "surprise": 25.66666667,
    "fear": 35.33333333,
    "happiness": 0.333333333
  },
  {
    "sadness": 17.66666667,
    "neutral": 0,
    "disgust": 6,
    "anger": 2,
    "surprise": 17.33333333,
    "fear": 40.33333333,
    "happiness": 0.333333333
  }
];

  var weights = {
    anger: -1.0,
    fear: -0.7,
    disgust: -0.3,
    sadness: -0.1,
    neutral: 0,
    surprise: 0.8,
    happiness: 1.0
  };

  function dotProduct(vec, weights) {
    if(vec.length != weights.length) return 0;
    var result = 0;
    for(var k in vec) {
      result += vec[k] * weights[k];
    }
    return result;
  }

  function calculateScores(emotions) {
    return emotions.map(function(e) {
      return dotProduct(e, weights);
    });
  }

  function calculateDifferences(s1, s2) {
    return s1.map(function(x, i) {
      return Math.abs(s1[i] - s2[i]);
    });
  }

  function buildReport(differences) {
    function maxElement(arr) {
      return Math.max.apply(Math, arr);
    }

    var nIndexes = 5; 
    var resultsIndexes = [];
    var resultsScores = []
    while(nIndexes > 0) {
      var maxIndex = differences.indexOf(maxElement(differences));
      resultsIndexes.push(maxIndex);
      resultsScores.push(differences[maxIndex]);
      differences[maxIndex] = Number.MIN_SAFE_INTEGER;
      nIndexes--;
    }

    return resultsScores.map(function(r, i) {
      return {
        time: resultsIndexes[i], score: resultsScores[i]
      };
    });

  }

  function buildTraces(emotions) {
    var keys = ["sadness", "neutral", "disgust", "anger", "surprise", "fear", "happiness"];
    var colors = ["rgb(164, 194, 244)", "rgb(255, 217, 102)", "rgb(234, 153, 153)", 
                  "rgb(120, 230, 195)", "rgb(142, 60, 120)", "rgb(234, 124, 100)"];
    var traces = [];
    for (var i = 0; i < keys.length; i++) {
      console.log("i = " + i + ", k[i] " + keys[i]);
      var k = keys[i];
      var color = colors[i];
      var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      var y = emotions.map(function(e) { return e[k]; });
      console.log("x = " + x + ", y = " + y);
      
      traces.push({
        x: x,
        y: y,
        mode: "markers",
        name: k,
        marker: {
          color: color,
          size: 12,
          line: {
            color: "white",
            width: 0.5
          }
        },
        type: "scatter"
      });
    }

    console.log("traces = " + traces);
    return traces;
  }

  function plotGraph(traces, graphName, callback) {
    console.log("TRACES = " + JSON.stringify(traces));
    console.log("---------");
    var layout = {
      title: "Emotions Detection",
      xaxis: {
        title: "Time",
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: "Confidence",
        showline: false
      }
    };

    var graphOptions = {layout: layout, filename: graphName, fileopt: "overwrite"};
    plotly.plot(traces, graphOptions, function(err, msg) {
      if(err) return callback(err);
      
      callback(null, msg);
    });
  }

  if(!req.body.emotions) {
    return res.json({error: "no emotions.."});
  }
  var userEmotions = req.body.emotions;
  console.log("emotions = " + JSON.stringify(userEmotions));
  if(baselineEmotions.length != userEmotions.length) {
    return res.json({error: "UserData must have " + 
                            baselineEmotions.length + " elements"});
  }

  userEmotions = userEmotions.map(function(e) {
    var result = {};
    for(var k in e) {
      result[k] = e[k].value;
    }
    return result;
  });

  var baselineTraces = buildTraces(baselineEmotions);
  var userTraces = buildTraces(userEmotions);
  var baselineScores = calculateScores(baselineEmotions);
  var userScores = calculateScores(userEmotions);
  var differences = calculateDifferences(baselineScores, userScores);

  plotGraph(baselineTraces, "baseline-graph", function(err, baselineMsg) {
    console.log("here1, err = " + JSON.stringify(err));
    if(err) return res.json({error: err});

    plotGraph(userTraces, "user-graph", function(err, userMsg) {
      console.log("here2, err = " + JSON.stringify(err));
      if(err) return res.json({error: err});

      console.log("Sending back: " + JSON.stringify({
        baselineMessage: baselineMsg,
        userMessage: userMsg,
        report: buildReport(differences)
      }));

      res.json({
        baselineMessage: baselineMsg,
        userMessage: userMsg,
        report: buildReport(differences)
      });

    });
  });

}
