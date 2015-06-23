angular.module('18f').controller('18fProfileSignInPageController', function($scope, SignInService) {
    'use strict';

    $scope.inputs = {
        email: {
            required: true,
            value: '',
            error: ''
        },
        password: {
            required: true,
            value: '',
            error: ''
        }
    };

    var isBlank = function(str) {
        return (!str || /^\s*$/.test(str));
    };

    $scope.isInputValid = function() {
        var isValid = true;
        // Check required fields
        angular.forEach($scope.inputs, function(input) {
            if (!input.required) {
                return;
            }
            if (isBlank(input.value)) {
                input.error = 'Field can not be empty.';
                isValid = false;
            }
            else {
                input.error = '';
            }
        });

        return isValid;
    };

    $scope.signIn = function() {
        if(!$scope.isInputValid()) {
            return;
        }

        SignInService.authenticate({
            email: $scope.inputs.email.value,
            password: $scope.inputs.password.value
        }).then(function(result) {
            console.log('Got response: ' + JSON.stringify(result));
        });
    };

});
