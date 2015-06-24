
describe('18fSearchSidebarController', function() {

    var $rootScope, $scope, $controller;

    beforeEach(module('18f'));

    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('18fSearchSidebarController', {
            '$rootScope' : $rootScope,
            '$scope': $scope
        });
    }));

    it('term should be empty', function() {
        // should be empty initially
        expect($scope.term).toBe('');
    });

});
