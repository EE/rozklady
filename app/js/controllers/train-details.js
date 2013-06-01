(function () {
    'use strict';

    angular.module('rozkladyApp')
        .controller('TrainDetailsCtrl', function ($scope, $routeParams, backend) {
            backend.trainDetails($routeParams.trainId).then(function (data) {
                console.log(data);
                $scope.table = data;
            });
        });
})();
