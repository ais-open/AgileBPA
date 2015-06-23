angular.module('18f').controller('18fProfileController', function($scope, SignInService) {

    var initialize = function() {
        $scope.profile = SignInService.getProfile();
    };
    initialize();

});
