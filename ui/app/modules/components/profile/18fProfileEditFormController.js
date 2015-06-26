angular.module('18f').controller('18fProfileEditFormController', function($scope, $location, ProfileApi, ProfileService) {
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
        $scope.$watch('ProfileService.user', function() {
            if (ProfileService.user == null ||
                typeof ProfileService.user === 'undefined' ||
                typeof ProfileService.user.email === 'undefined') {
                return;
            }

            $scope.inputs.firstName.value = ProfileService.user.firstName;
            $scope.inputs.lastName.value = ProfileService.user.lastName;
            $scope.inputs.email.value = ProfileService.user.email;
            $scope.inputs.emailConf.value = ProfileService.user.email;
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

        ProfileApi.patch({
            'user': ProfileService.user.token,
            'firstName': $scope.inputs.firstName.value,
            'lastName': $scope.inputs.lastName.value,
            'email': $scope.inputs.email.value
        }, function(result) {
            ProfileService.refreshProfile();
            swal({
                title: 'Success!',
                text: 'Your profile information has been updated.',
                type: 'success',
                confirmButtonText: 'Ok'
            });
        }, function(error) {
            ProfileService.refreshProfile();
            swal({
                title: 'Error!',
                text: error.data.message,
                type: 'error',
                confirmButtonText: 'Ok'
            });
        });
    };

});
