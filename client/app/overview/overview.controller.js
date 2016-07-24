'use strict';

(function(){

class OverviewComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('footstepsApp')
  .component('overview', {
    templateUrl: 'app/overview/overview.html',
    controller: OverviewComponent,
    controllerAs: 'overviewCtrl'
  })
  .controller('overviewCtrl', function($scope){
    $scope.selected = 0;
    $scope.actions = [{name:'Talking to TA', img_url:'assets/images/ta.png'},
      {name:'Walking Home', img_url:'assets/images/yeoman.png'}, {name:'Interviewing for job', img_url:'assets/images/play-button.png'}];
  });

})();
