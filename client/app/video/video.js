'use strict';

angular.module('footstepsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/video', {
        template: '<video></video>'
      });
  });
