angular.module('18f').controller('18fProfileSignInPageController', function($scope, $location, ProfileService) {
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
        var page = this;
        ProfileService.authenticate({
            email: $scope.inputs.email.value,
            password: $scope.inputs.password.value
        }).then(function(result) {
            if (result) {
                $location.path('/');
            }
            else {
                page.authError = 'Email/Password combination does not match.';
            }
        });
    };

});
