'use strict';

(function(){

class MyvideoComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('footstepsApp')
  .component('myvideo', {
    templateUrl: 'app/myvideo/myvideo.html',
    controller: MyvideoComponent,
    controllerAs: 'myvideoCtrl'
  })
  .controller('myvideoCtrl', function($scope) {
    
  });
})();
