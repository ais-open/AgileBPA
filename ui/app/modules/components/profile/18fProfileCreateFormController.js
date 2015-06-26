angular.module('18f').controller('18fProfileCreateFormController', function($scope, $location, ProfileApi, ProfileService) {
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
        },
        password: {
            required: true,
            value: '',
            error: ''
        },
        passwordConf: {
            required: true,
            value: '',
            error: ''
        },
        terms: {
            required: true,
            value: false,
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

        if (!$scope.inputs.terms.value) {
            $scope.inputs.terms.error = 'You should accept our Terms and Conditions.';
        }

        // Make sure emails match
        if ($scope.inputs.email.error === '' &&
            $scope.inputs.emailConf.error === '' &&
            $scope.inputs.email.value != $scope.inputs.emailConf.value) {

            $scope.inputs.email.error = 'Emails entries should match.';
            $scope.inputs.emailConf.error = 'Email entries should match.';
            isValid = false;
        }

        // Make sure passwords match
        if ($scope.inputs.password.error === '' &&
            $scope.inputs.passwordConf.error === '' &&
            $scope.inputs.password.value != $scope.inputs.passwordConf.value) {

            $scope.inputs.password.error = 'Password entries should match.';
            $scope.inputs.passwordConf.error = 'Password entries should match.';
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
        ProfileApi.save({
            'firstName': $scope.inputs.firstName.value,
            'lastName': $scope.inputs.lastName.value,
            'email': $scope.inputs.email.value,
            'password': $scope.inputs.password.value
        }, function(result) {
            swal({
                title: 'Success!',
                text: 'Congratulations, You have successfully created a Profile.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
            ProfileService.signIn(result);
            $location.path('/');
        }, function(error) {
            swal({
                title: 'Error',
                text: 'We are unable to create a profile for you at this time.',
                type: 'error',
                confirmButtonText: 'Ok'
            });
        });
    };

});
