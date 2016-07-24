angular.module('footstepsApp').controller('sentimentController', ['$scope', '$rootScope', '$resource',
    function ($scope, $rootScope, $resource, $location) {
      $scope.sent = {};
      $scope.sent.width = 320;    // We will scale the photo width to this
      $scope.sent.height = 0;     // This will be computed based on the input stream
      $scope.sent.Snapshot = $resource('/api/snapshots');
      $scope.sent.emotions = [];
      // |streaming| indicates whether or not we're currently streaming
      // video from the camera. Obviously, we start at false.

      $scope.sent.streaming = false;

      // The various HTML elements we need to configure or control. These
      // will be set by the startup() function.

      $scope.sent.video = document.getElementById('video');
      $scope.sent.canvas = document.getElementById('canvas');
      $scope.sent.photo = document.getElementById('photo');
      $scope.sent.startbutton = document.getElementById('startbutton');

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
              $scope.sent.video.mozSrcObject = stream;
            } else {
              var vendorURL = window.URL || window.webkitURL;
              $scope.sent.video.src = vendorURL.createObjectURL(stream);
            }
            $scope.sent.video.play();
          },
          function(err) {
            console.log("An error occured! " + err);
          }
        );

        $scope.sent.video.addEventListener('canplay', function(ev){
          if (!$scope.sent.streaming) {
            $scope.sent.height = $scope.sent.video.videoHeight / ($scope.sent.video.videoWidth/$scope.sent.width);
          
            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.
          
            if (isNaN($scope.sent.height)) {
              $scope.sent.height = $scope.sent.width / (4/3);
            }
          
            $scope.sent.video.setAttribute('width', $scope.sent.width);
            $scope.sent.video.setAttribute('height', $scope.sent.height);
            $scope.sent.canvas.setAttribute('width', $scope.sent.width);
            $scope.sent.canvas.setAttribute('height', $scope.sent.height);
            $scope.sent.streaming = true;
          }
        }, false);

        $scope.sent.startbutton.addEventListener('click', function(ev){
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
        var context = $scope.sent.canvas.getContext('2d');
        if ($scope.sent.width && $scope.sent.height) {
          $scope.sent.canvas.width = $scope.sent.width;
          $scope.sent.canvas.height = $scope.sent.height;
          context.drawImage($scope.sent.video, 0, 0, $scope.sent.width, $scope.sent.height);
        
          var data = $scope.sent.canvas.toDataURL('image/png');
          $scope.sent.photo.setAttribute('src', data);
          $scope.sent.Snapshot.save({'image':data})
              .$promise.then(function(res){
                  console.log(res.persons);
              },function(err){

              });
        } else {
          $scope.sent.clearphoto();
        }
      };

      $scope.sent.startup();
}]);