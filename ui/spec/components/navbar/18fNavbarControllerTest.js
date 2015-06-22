/**
 * 18fNavbarControllerTest
 */
describe('18fNavbarController', function() {

    var $rootScope, $scope, $controller;

    beforeEach(module('18f'));

    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('18fNavbarController', {
            '$rootScope' : $rootScope,
            '$scope': $scope
        });
    }));

    it('should toggle the menuOn attribute', function() {
        expect($scope.menuOn).toBe(false);
        $scope.toggleMenu();
        expect($scope.menuOn).toBe(true);
    });
});
