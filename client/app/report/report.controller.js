'use strict';

(function(){

class ReportComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('footstepsApp')
  .component('report', {
    templateUrl: 'app/report/report.html',
    controller: ReportComponent,
    controllerAs: 'reportCtrl'
  });

})();
