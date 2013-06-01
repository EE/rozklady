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
                $http({method: 'GET', url: 'http://127.0.0.1:8007/info_pasazer/index_set.php?stacja=' + $scope.city})
                    .success(function (data) {
                        $scope.autocompleteResult = [];
                        $($.parseHTML(data)).find('td a').each(function(_i, el){
                            $scope.autocompleteResult.push({name: $(el).text(), href: $(el).attr('href')});
                        });
                    })
                    .error(function (data) {
                        $scope.autocompleteResult = 'error';
                    });
            };
        });
})();
