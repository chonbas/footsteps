angular.module('footstepsApp').controller('reportGraphController', ['$scope', '$rootScope', '$resource',
    function ($scope, $rootScope, $resource) {
      $scope.report = {};
      $scope.report.baselineEmotions = [{   "sadness": 51.33333333,
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
                            
        // $scope.report.startup = function(){
        //   var base_img_url = $rootScope.graphData.baseline_url + '.jpg';
        //   var user_img_url = $rootScope.graphData.user_url + '.jpg';
        //   var embedBaselineImage = document.getElementById('basegraph');
        //   var embedUserImage = document.getElementById('usergraph');
        //   embedImage.setAttribute('src', img_url);
        // };
        // $scope.report.startup();
        $scope.report.report = [];
        $scope.report.report = $rootScope.graphData.report;
        $scope.report.user_emotions = $rootScope.graphData.user_emotions;
        $scope.report.table_html = "<h3>The five time intervals during which you and the author divereged the most were:</h3>";
        $scope.report.table_html+="<table class='table table-striped'><tr><td>Divergence Score</td>";
        $scope.report.table_html+="<td>Time Interval(seconds)</td></tr>";
        for (var i = 0; i < 5; i++){
          $scope.report.table_html+="<tr>";
          $scope.report.table_html+="<td>" + $scope.report.report[i].score; + "</td>";
          var start_time = (parseInt($scope.report.report[i].time) * 1200)/1000;
          var end_time = start_time + 1.2;
          $scope.report.table_html+="<td>" + start_time +" - " + end_time + "</td>";
          $scope.report.table_html+="</tr>";
        }
        $scope.report.table_html+="</table>";

        $scope.report.tableView = $('#reportView');

        $scope.report.tableView.html($scope.report.table_html);



}]);