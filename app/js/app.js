(function () {
    'use strict';

    angular.module('rozkladyApp', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/search-city.html',
                    controller: 'SearchCityCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
