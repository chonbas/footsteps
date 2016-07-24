'use strict';

angular.module('footstepsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/reflection', {
        template: '<reflection></reflection>'
      });
  });
