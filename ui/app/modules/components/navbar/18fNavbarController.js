angular.module('18f').controller('18fNavbarController', function($scope, SignInService) {
    'use strict';

    $scope.menuOn = false;
    $scope.profile;

    $scope.toggleMenu = function() {
        $scope.menuOn = !$scope.menuOn;
    };

    $scope.signIn = function() {
        var user = SignInService.getProfile();
        if (user !== null) {
            SignInService.signIn();
        }
    };
    $scope.signOut = function() {
        SignInService.signOut();
    };

    var refreshProfile = function() {
        $scope.profile = SignInService.getProfile();
    };
    var initialize = function() {
        SignInService.registerObserver('signin', refreshProfile);
        SignInService.registerObserver('signout', refreshProfile);
        refreshProfile();
    };
    initialize();

});
