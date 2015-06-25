angular.module('18f').controller('18fMedListController', function($scope, ProfileService) {
    'use strict';

    var initialize = function() {
        $scope.ProfileService = ProfileService;
    };
    initialize();

});
