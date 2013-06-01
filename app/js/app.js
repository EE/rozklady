(function () {
    'use strict';

    angular.module('rozkladyApp', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/search-station.html',
                    controller: 'SearchStationCtrl',
                })
                .when('/station/:stationId', {
                    templateUrl: 'views/station-details.html',
                    controller: 'StationDetailsCtrl',
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
