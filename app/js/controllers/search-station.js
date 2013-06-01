(function () {
    'use strict';

    angular.module('rozkladyApp')
        .controller('SearchStationCtrl', function ($scope, backend) {
            $scope.searchCity = function () {
                backend.autocomplete($scope.city).then(function (data) {
                    $scope.autocompleteResult = data;
                });
            };
        });
})();
