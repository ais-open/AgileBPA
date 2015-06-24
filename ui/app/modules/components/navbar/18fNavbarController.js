angular.module('18f').controller('18fNavbarController', function($scope, $location, SignInService) {
    'use strict';

    $scope.menuOn = false;

    $scope.toggleMenu = function() {
        $scope.menuOn = !$scope.menuOn;
    };

    var initialize = function() {
        $scope.SignInService = SignInService;
    };
    initialize();

});
