(function () {
    'use strict';

    describe('Controller: SearchCityCtrl', function () {

        // load the controller's module
        beforeEach(module('rozkladyApp'));

        var SearchCityCtrl, scope, $httpBackend,
            stalowaWolaSearchUrl = PROXY_URL + '/info-pasazer/index_set.php?stacja=Stalowa Wola';

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend
                .expectGET(stalowaWolaSearchUrl)
                .respond('' +
                    '<table><tbody>' +
                    '<tr><td><a href="http://example.com/1">Stalowa Wola</a></td></tr>' +
                    '<tr><td><a href="http://example.com/2">Stalowa Wola Centrum</a></td></tr>' +
                    '<tr><td><a href="http://example.com/3">Stalowa Wola Południe</a></td></tr>' +
                    '</tbody></table>');

            scope = $rootScope.$new();
            SearchCityCtrl = $controller('SearchCityCtrl', {
                $scope: scope
            });
        }));

        it('Should display 3 stations when received table with 3 rows', function () {
            scope.city = 'Stalowa Wola';
            scope.searchCity();
            $httpBackend.flush();
            expect(scope.autocompleteResult.length).toBe(3);
        });
    });
})();
