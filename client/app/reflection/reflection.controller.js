'use strict';

(function(){

class ReflectionComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('footstepsApp')
  .component('reflection', {
    templateUrl: 'app/reflection/reflection.html',
    controller: ReflectionComponent,
    controllerAs: 'reflectionCtrl'
  });

})();
