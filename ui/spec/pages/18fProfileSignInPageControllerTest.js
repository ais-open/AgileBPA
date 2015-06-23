describe('18fProfileSignInPageController', function() {

    var $rootScope, $scope, $controller;

    beforeEach(module('18f'));

    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('18fProfileSignInPageController', {
            '$rootScope': $rootScope,
            '$scope': $scope
        });
    }));

    it('should validate form entries', function() {
        expect($scope.inputs.email.error).toBe('');
        expect($scope.isInputValid()).toBe(false);
        expect($scope.inputs.email.error).not.toBe('');

        $scope.inputs.email.value = 'foo@bar.com';
        expect($scope.isInputValid()).toBe(false);
        expect($scope.inputs.email.error).toBe('');

        $scope.inputs.password.value = 'baz';
        expect($scope.isInputValid()).toBe(true);
        expect($scope.inputs.email.error).toBe('');
        expect($scope.inputs.password.error).toBe('');
    });
});
