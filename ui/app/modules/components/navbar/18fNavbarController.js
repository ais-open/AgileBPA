angular.module('18f').controller('18fNavbarController', function($scope) {
    'use strict';

    $scope.menuOn = false;

    $scope.toggleMenu = function() {
        $scope.menuOn = !$scope.menuOn;
    };

});
