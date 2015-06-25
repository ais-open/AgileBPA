angular.module('18f').controller('18fMedDetailController', function($scope, SignInService) {
    'use strict';

    var initialize = function() {
        $scope.SignInService = SignInService;
    };
    initialize();

});
