angular.module('18f').controller('18fProfileController', function($scope, ProfileService) {

    var initialize = function() {
        $scope.ProfileService = ProfileService;
    };
    initialize();

});
