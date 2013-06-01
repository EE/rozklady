(function () {
    'use strict';

    angular.module('rozkladyApp')
        .service('backend', function ($http) {
            this.autocomplete = function autocomplete(city) {
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
            };
            this.stationDetails = function stationDetails(stationId) {
                return $http.get(PROXY_URL + '/info-pasazer/index3.php?nr_sta=' + stationId)
                    .then(function (response) {
                        return $($.parseHTML(response.data)).find('table.contacts').addBack('table.contacts');
                    });
            };
        });
})();
