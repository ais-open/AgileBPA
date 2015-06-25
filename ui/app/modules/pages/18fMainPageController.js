angular.module('18f').controller('18fMainPageController', function($scope, ProfileService) {
    'use strict';

    var initialize = function() {
        $scope.ProfileService = ProfileService;
    };
    initialize();
});
