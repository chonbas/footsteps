'use strict';

angular.module('footstepsApp', ['footstepsApp.constants', 'ngCookies', 'ngResource', 'ngSanitize',
    'ngRoute', 'ui.bootstrap'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
