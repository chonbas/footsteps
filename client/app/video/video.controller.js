'use strict';

(function(){

class VideoComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('footstepsApp')
  .component('video', {
    templateUrl: 'app/video/video.html',
    controller: VideoComponent,
    controllerAs: 'videoCtrl'
  });

})();
