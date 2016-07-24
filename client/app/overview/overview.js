'use strict';

angular.module('footstepsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/overview', {
        template: '<overview></overview>'
      });
  });
