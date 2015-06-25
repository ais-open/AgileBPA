angular.module('18f').controller('18fProfileEditFormController', function($scope, $location, ProfileService, SignInService) {
    'use strict';

    $scope.inputs = {
        firstName: {
            required: true,
            value: '',
            error: ''
        },
        lastName: {
            required: true,
            value: '',
            error: ''
        },
        email: {
            required: true,
            value: '',
            error: ''
        },
        emailConf: {
            required: true,
            value: '',
            error: ''
        }
    };

    var initialize = function() {
        $scope.$watch('SignInService.user', function() {
            if (SignInService.user == null ||
                typeof SignInService.user === 'undefined' ||
                typeof SignInService.user.email === 'undefined') {
                return;
            }

            $scope.inputs.firstName.value = SignInService.user.firstName;
            $scope.inputs.lastName.value = SignInService.user.lastName;
            $scope.inputs.email.value = SignInService.user.email;
            $scope.inputs.emailConf.value = SignInService.user.email;
        });
    };
    initialize();

    var isBlank = function(str) {
        return (!str || /^\s*$/.test(str));
    };

    $scope.isInputValid = function() {
        var isValid = true;

        // Check required fields
        angular.forEach($scope.inputs, function(input) {
            input.error = ''; // reset

            if (!input.required) {
                // no need to check this one for empty strings
                return; // continue;
            }

            if (isBlank(input.value)) {
                input.error = 'Field can not be empty.';
                isValid = false;
            }
            else {
                // they fixed it.
                input.error = '';
            }
        });

        // Make sure emails match
        if ($scope.inputs.email.error === '' &&
            $scope.inputs.emailConf.error === '' &&
            $scope.inputs.email.value != $scope.inputs.emailConf.value) {

            $scope.inputs.email.error = 'Emails entries should match.';
            $scope.inputs.emailConf.error = 'Email entries should match.';
            isValid = false;
        }

        return isValid;
    };


    $scope.saveProfile = function() {
        if(!$scope.isInputValid()) {
            return;
        }
        console.log('Saving profile with inputs: ' +
                    JSON.stringify($scope.inputs));
        SignInService.user.firstName = $scope.inputs.firstName.value;
        SignInService.user.lastName = $scope.inputs.lastName.value;
        SignInService.user.email = $scope.inputs.email.value;
        SignInService.user.$save(function(result, headers) {
            console.log('User updated!');
            swal({
                title: 'Success!',
                text: 'Your profile information has been updated.',
                type: 'success',
                confirmButtonText: 'Ok',
                timer: 3000
            });
        }, function(error) {
            console.log('ERROR: ' + JSON.stringify(error.data.message));
            swal({
                title: 'Error!',
                text: error.data.message,
                type: 'error',
                confirmButtonText: 'Ok'
            });
        });
    };

});
