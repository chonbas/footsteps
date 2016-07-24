angular.module('footstepsApp').controller('reportGraphController', ['$scope', '$rootScope', '$resource',
    function ($scope, $rootScope, $resource, $location) {
        $scope.report = {};
        $scope.report.report_data = $rootScope.graphData.report;
        $scope.report.user_data = $rootScope.graphData.user_emotions;
        
        console.log($scope.report.report_data);

}]);