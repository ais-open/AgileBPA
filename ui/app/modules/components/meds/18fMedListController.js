angular.module('18f').controller('18fMedListController', function($scope, $location, ProfileService) {
    'use strict';

    $scope.goTo = function(medId) {
        $location.path('/meds/' + medId);
    };

    var initialize = function() {
        $scope.ProfileService = ProfileService;
    };
    initialize();

});
