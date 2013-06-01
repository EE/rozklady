(function () {
    'use strict';

    angular.module('rozkladyApp')
        .service('backend', function ($http) {
            this.autocomplete = function autocomplete(city) {
                return $http.get(PROXY_URL + '/index_set.php?stacja=' + city)
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
                return $http.get(PROXY_URL + '/index3.php?nr_sta=' + stationId)
                    .then(function (response) {
                        return $($.parseHTML(response.data)).find('table.contacts').addBack('table.contacts');
                    });
            };
            this.trainDetails = function trainDetails(trainId) {
                return $http.get(PROXY_URL + '/index_pociag.php?nr_id=' + trainId)
                    .then(function (response) {
                        var timeline = [],
                            rows = $($.parseHTML(response.data)).find('table.contacts').addBack('table.contacts')
                                .find('tr:not(:first-child)');

                        rows.each(function (index, elem) {
                            var elem$ = $(elem),
                                cells$ = elem$.children(),
                                places = cells$.eq(2).html().split('<br>');

                            timeline.push({
                                current: cells$.eq(2).hasClass('mid'), // InfoPasażer CSS is so messy...

                                trainNumber: cells$.eq(0).text().trim(),
                                date: cells$.eq(1).text().trim(),
                                startPlace: places[0].trim(),
                                endPlace: places[1].trim(),
                                station: cells$.eq(3).text().trim(),
                                plannedArrival: cells$.eq(4).text().trim(),
                                arrivalDelay: cells$.eq(5).text().trim(),
                                plannedDeparture: cells$.eq(6).text().trim(),
                                departureDelay: cells$.eq(7).text().trim(),
                            });
                        });

                        return timeline;
                    });
            };
        });
})();
