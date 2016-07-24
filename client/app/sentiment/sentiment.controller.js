angular.module('footstepsApp').controller('sentimentController', ['$scope', '$rootScope', '$resource',
    function ($scope, $rootScope, $resource, $location) {
      $scope.sent = {};
      $scope.sent.width = 320;    // We will scale the photo width to this
      $scope.sent.height = 0;     // This will be computed based on the input stream
      $scope.sent.Snapshot = $resource('/api/snapshots');
      $scope.sent.Result = $resource('/api/reports');
      $scope.sent.playVideo = false;
      $scope.sent.emotions = [];
      $scope.sent.snapshot_count = 0;
      // |streaming| indicates whether or not we're currently streaming
      // video from the camera. Obviously, we start at false.

      $scope.sent.streaming = false;

      // The various HTML elements we need to configure or control. These
      // will be set by the startup() function.

      $scope.sent.user_video = document.getElementById('user_video');
      $scope.sent.display_video = document.getElementById('display_video')
      $scope.sent.canvas = document.getElementById('canvas');
      $scope.sent.photo = document.getElementById('photo');
      $scope.sent.startbutton = document.getElementById('startbutton');
      $scope.sent.startvideoBtn = document.getElementById('startvideo');

      $scope.sent.startup = function() {
        navigator.getMedia = ( navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);

        navigator.getMedia(
          {
            video: true,
            audio: false
          },
          function(stream) {
            if (navigator.mozGetUserMedia) {
              $scope.sent.user_video.mozSrcObject = stream;
            } else {
              var vendorURL = window.URL || window.webkitURL;
              $scope.sent.user_video.src = vendorURL.createObjectURL(stream);
            }
            $scope.sent.user_video.play();
          },
          function(err) {
            console.log("An error occured! " + err);
          }
        );

        $scope.sent.user_video.addEventListener('canplay', function(ev){
          if (!$scope.sent.streaming) {
            $scope.sent.height = $scope.sent.user_video.videoHeight / ($scope.sent.user_video.videoWidth/$scope.sent.width);
          
            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.
          
            if (isNaN($scope.sent.height)) {
              $scope.sent.height = $scope.sent.width / (4/3);
            }
          
            $scope.sent.user_video.setAttribute('width', $scope.sent.width);
            $scope.sent.user_video.setAttribute('height', $scope.sent.height);
            $scope.sent.canvas.setAttribute('width', $scope.sent.width);
            $scope.sent.canvas.setAttribute('height', $scope.sent.height);
            $scope.sent.streaming = true;
          }
        }, false);

        $scope.sent.startbutton.addEventListener('click', function(ev){
          $scope.sent.takepicture();
          ev.preventDefault();
        }, false);

        $scope.sent.startvideoBtn.addEventListener('click', function(ev){
          $scope.sent.playVideo = true;
          $scope.sent.display_video.play();
          $scope.sent.takepicture();
          ev.preventDefault();
        }, false);
        $scope.sent.clearphoto();
      };

      // Fill the photo with an indication that none has been
      // captured.

      $scope.sent.clearphoto = function() {
        var context = $scope.sent.canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, $scope.sent.canvas.width, $scope.sent.canvas.height);

        var data = $scope.sent.canvas.toDataURL('image/png');
        $scope.sent.photo.setAttribute('src', data);
      };
      
      // Capture a photo by fetching the current contents of the video
      // and drawing it into a canvas, then converting that to a PNG
      // format data URL. By drawing it on an offscreen canvas and then
      // drawing that to the screen, we can change its size and/or apply
      // other changes before drawing it.

      $scope.sent.takepicture = function() {
        if ($scope.sent.playVideo && !$scope.sent.display_video.ended){
            setTimeout($scope.sent.takepicture, 1200);
            var context = $scope.sent.canvas.getContext('2d');
            if ($scope.sent.width && $scope.sent.height) {
              $scope.sent.canvas.width = $scope.sent.width;
              $scope.sent.canvas.height = $scope.sent.height;
              context.drawImage($scope.sent.user_video, 0, 0, $scope.sent.width, $scope.sent.height);
            
              var data = $scope.sent.canvas.toDataURL('image/png');
              $scope.sent.photo.setAttribute('src', data);
              $scope.sent.Snapshot.save({'image':data})
                  .$promise.then(function(res){
                    $scope.sent.snapshot_count++;
                    if (!res.error_code){
                      // console.log(res);
                        //need to add code to stop player when no people in frame
                        // if (res.persons.length === 0){
                        //   $scope.sent.display_video.pause();
                        //   $scope.sent.playVideo = false;
                        //   $scope.sent.snapshot_count--;
                        //   return;
                        // }
                        var snapshot = res.persons[0].expressions;
                        $scope.sent.emotions.push(snapshot);
                        if ($scope.sent.display_video.ended){
                            $scope.sent.getReport();
                        }
                    }
                      
                      // }
                  },function(err){

                  });
            } else {
              $scope.sent.clearphoto();
            }
        }        
      };


      //Once we have taken and processed all snapshots, send back to server for comparison 
      // against baseline for video
      $scope.sent.getReport = function(){
        console.log($scope.sent.emotions);
        $scope.sent.Result.save({'emotions':$scope.sent.emotions})
          .$promise.then(
              function(res){
                  //aray of 5 objects with key 'time' and key 'score'
                  console.log("response" + res);
              }
            ,function(err){

            });
      };

      $scope.sent.startup();

}]);
