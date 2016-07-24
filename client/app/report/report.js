'use strict';

angular.module('footstepsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/report', {
        template: '<report></report>'
      });
  });
