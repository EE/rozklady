(function () {
    'use strict';

    angular.module('rozkladyApp')
        .factory('autocompleteCity', function ($http) {
            return function (city) {
//            http.get('http://infopasazer.intercity.pl/index_set.php?stacja=' + city, function (result) {
//
//            });
            };
        });

    angular.module('rozkladyApp')
        .controller('SearchCityCtrl', function ($scope, $http, autocompleteCity) {
            $scope.autocompleteResult = 'dupa';
            $scope.searchCity = function () {
                $http({method: 'GET', url: 'http://infopasazer.intercity.pl/index_set.php?stacja=' + $scope.city})
                    .success(function (data) {
                        $scope.autocompleteResult = $scope.city;
                    })
                    .error(function (data) {
                        $scope.autocompleteResult = 'error';
                    });
            };
        });
})();
