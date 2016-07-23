'use strict';

angular.module('footstepsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/sentimenttest', {
        template: '<sentimenttest></sentimenttest>'
      });
  });
