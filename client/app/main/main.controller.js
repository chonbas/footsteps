'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.awesomeThings = [
        {name: 'Hey', info: "oh!"}
      ];
    }

    $onInit() {
      this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
    }
  }

  // angular.module('footstepsApp')
  // .controller('ExampleController', ['$scope', function($scope) {
  //   $scope.list = ['lorem'];
  //   $scope.text = 'hello';
  //   $scope.submit = function() {
  //     if ($scope.text) {
  //       $scope.list.push(this.text);
  //       $scope.text = '';
  //     }
  //   };
  // }]);

  angular.module('footstepsApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  })
  .controller('SubmitController', function($scope) {
    $scope.toOverview = function() {
      // console.log("clicked!");
      window.location.href = "/overview";
    };
  })
  // .controller('ExampleController', function($scope) {
  //   $scope.x= true;
  //   $scope.list = ['lorem'];
  //   $scope.text = 'hello';
  //   $scope.submit = function() {
  //     if ($scope.text) {
  //       $scope.list.push(this.text);
  //       $scope.text = '';
  //     }
  //   };
  //   $scope.toOverview = function() {
  //     // console.log("clicked!");
  //     window.location.href = "/overview";
  //   };
  // })
  ; // Closing semicolon, independent of preceeding function
})();
