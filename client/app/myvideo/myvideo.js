'use strict';

angular.module('footstepsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myvideo', {
        template: '<myvideo></myvideo>'
      });
  });
