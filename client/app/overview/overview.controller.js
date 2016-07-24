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
  });

})();
