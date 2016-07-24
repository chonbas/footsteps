'use strict';

(function(){

class ResourcesComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('footstepsApp')
  .component('resources', {
    templateUrl: 'app/resources/resources.html',
    controller: ResourcesComponent,
    controllerAs: 'resourcesCtrl'
  });

})();
