/**
 * 18fMainPageController tests
 */
describe('18fMainPageController', function() {

    var $rootScope, $scope, $controller;

    beforeEach(module('18f'));

    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('18fMainPageController', {
            '$rootScope' : $rootScope,
            '$scope': $scope
        });
    }));

    it('should initialize correctly', function() {
        expect($scope.ProfileService).toBeDefined();
    });
});
