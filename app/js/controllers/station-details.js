(function () {
    'use strict';

    angular.module('rozkladyApp')
        .controller('StationDetailsCtrl', function ($scope, $routeParams, backend) {
            backend.stationDetails($routeParams.stationId).then(function (data) {
                $scope.tables = data;
            });
        });
})();
