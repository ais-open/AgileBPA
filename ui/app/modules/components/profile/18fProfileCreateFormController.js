angular.module('18f').controller('18fProfileCreateFormController', function($scope) {
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
        terms: {
            required: true,
            value: false,
            error: ''
        }
    };

    var isBlank = function(str) {
        return (!str || /^\s*$/.test(str));
    }

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
            $scope.inputs.email.hasError = true;
            $scope.inputs.emailConf.hasError = true;
        }


        return isValid;
    };


    $scope.saveProfile = function() {
        console.log('Saving profile!');
        if(!$scope.isInputValid()) {
            console.log('Inputs: ' + JSON.stringify($scope.inputs));
            return;
        }
        console.log('Saving profile with inputs: ' +
                    JSON.stringify($scope.inputs));
    };

});
