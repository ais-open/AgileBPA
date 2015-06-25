angular.module('18f').controller('18fNavbarController', function($scope, $location, ProfileService) {
    'use strict';

    $scope.menuOn = false;

    $scope.toggleMenu = function() {
        $scope.menuOn = !$scope.menuOn;
    };

    $scope.signOut = function() {
        ProfileService.signOut();
        $location.path('/');
    };

    var initialize = function() {
        $scope.ProfileService = ProfileService;
    };
    initialize();

});
