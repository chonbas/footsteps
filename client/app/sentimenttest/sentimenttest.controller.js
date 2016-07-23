'use strict';

(function(){

class SentimenttestComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('footstepsApp')
  .component('sentimenttest', {
    templateUrl: 'app/sentimenttest/sentimenttest.html',
    controller: SentimenttestComponent,
    controllerAs: 'sentimenttestCtrl'
  });

})();
