/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reports              ->  index
 */

'use strict';

// Gets a list of Reports
export function index(req, res) {
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
        time: resultsIndexes[i], score: resultsIndexes[i]
      };
    });

  }

  var userEmotions = req.body.emotions;
  console.log("emotions = " + JSON.stringify(userEmotions));
  if(baselineEmotions.length != userEmotions.length) {
    return res.json({error: "UserData must have " + 
                            baselineEmotions.length + " elements"});
  }

  var baselineScores = calculateScores(baselineEmotions);
  var userScores = calculateScores(userEmotions);
  var differences = calculateDifferences(baselineScores, userScores);

  console.log("sending back: " + JSON.stringify(buildReport(differences)));

  res.json({report: buildReport(differences)});
}
