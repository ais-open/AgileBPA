angular.module('18f').controller('18fMedListController', function($scope, SignInService) {
    'use strict';

    var initialize = function() {
        $scope.SignInService = SignInService;
    };
    initialize();

});
