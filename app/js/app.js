(function () {
    'use strict';

    angular.module('rozkladyApp', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/search-city', {
                    templateUrl: 'views/search-city.html',
                    controller: 'SearchCityCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
