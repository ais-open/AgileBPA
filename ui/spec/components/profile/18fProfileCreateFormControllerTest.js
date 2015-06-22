
describe('18fProfileCreateFormController', function() {

    var $rootScope, $scope, $controller;

    beforeEach(module('18f'));

    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('18fProfileCreateFormController', {
            '$rootScope' : $rootScope,
            '$scope': $scope
        });
    }));

    it('should correctly validate input', function() {
        // should be false initially with no error messages
        expect($scope.inputs.firstName.error).toBe('');
        expect($scope.isInputValid()).toBe(false);
        // now we should have some validation messages
        expect($scope.inputs.firstName.error).not.toBe('');
    });

    it('should make sure email inputs match', function() {
        expect($scope.inputs.email.error).toBe('');
        expect($scope.inputs.emailConf.error).toBe('');
        expect($scope.isInputValid()).toBe(false);
        expect($scope.inputs.email.error).not.toBe('');
        expect($scope.inputs.emailConf.error).not.toBe('');

        angular.forEach($scope.inputs, function(input) {
            if (input.required) {
                input.value = 'foo';
            }
        });
        $scope.inputs.email.value = 'foo@bar.com';
        $scope.inputs.emailConf.value = 'baz@bar.com';

        expect($scope.isInputValid()).toBe(false);
        expect($scope.inputs.email.error).toMatch('match');
        expect($scope.inputs.emailConf.error).toMatch('match');

        $scope.inputs.emailConf.value = 'foo@bar.com';
        expect($scope.isInputValid()).toBe(true);
        expect($scope.inputs.email.error).toBe('');
        expect($scope.inputs.emailConf.error).toBe('');
    });

    it('should not save invalid profile data', function() {
        expect($scope.inputs.firstName.error).toBe('');
        $scope.saveProfile(); // should not save invalid data...
        expect($scope.inputs.firstName.error).not.toBe('');
    });
});
