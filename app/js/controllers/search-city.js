(function () {
    'use strict';

    angular.module('rozkladyApp')
        .factory('autocompleteCity', function ($http) {
            return {
                async: function(city) {
                    return $http.get(PROXY_URL + '/info_pasazer/index_set.php?stacja=' + city)
                        .then(function (response) {
                            var links = [];
                            $($.parseHTML(response.data)).find('td a').each(function (_i, el) {
                                links.push({name: $(el).text(), href: $(el).attr('href')});
                            });
                            return links;
                        });
                }
            };
        });

    angular.module('rozkladyApp')
        .controller('SearchCityCtrl', function ($scope, $http, autocompleteCity) {
            $scope.searchCity = function () {
                autocompleteCity.async($scope.city).then(function (data) {
                    $scope.autocompleteResult = data;
                });
            };
        });
})();
