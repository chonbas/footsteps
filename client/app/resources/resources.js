'use strict';

angular.module('footstepsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/resources', {
        template: '<resources></resources>'
      });
  });
