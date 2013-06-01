(function () {
    'use strict';

    angular.module('rozkladyApp')
        .factory('webservice', function ($http) {
            return {
                autocomplete: function(city) {
                    return $http.get(PROXY_URL + '/info-pasazer/index_set.php?stacja=' + city)
                        .then(function (response) {
                            var stationId, el$, links = [];
                            $($.parseHTML(response.data)).find('td a').each(function (_i, el) {
                                el$ = $(el);
                                stationId = el$.attr('href').match(/=([0-9]+)$/)[1];
                                links.push({name: el$.text(), href: '/#/station/' + stationId});
                            });
                            return links;
                        });
                },
                stationDetails: function (stationId) {
                    return $http.get(PROXY_URL + '/info-pasazer/index3.php?nr_sta=' + stationId)
                        .then(function (response) {
                            var tables$ = $($.parseHTML(response.data)).find('table.contacts');
                            console.log(tables$);
                            return tables$;
                        });
                }
            };
        });

    angular.module('rozkladyApp')
        .controller('StationSearchCtrl', function ($scope, webservice) {
            $scope.searchCity = function () {
                webservice.autocomplete($scope.city).then(function (data) {
                    $scope.autocompleteResult = data;
                });
            };
        })
        .controller('StationDetailsCtrl', function ($scope, $routeParams, webservice) {
            webservice.stationDetails($routeParams.stationId).then(function (data) {
                $scope.tables = data;
            });
        });
})();
