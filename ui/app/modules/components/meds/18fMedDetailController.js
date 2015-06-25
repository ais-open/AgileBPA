angular.module('18f').controller('18fMedDetailController', function($scope, $routeParams, SignInService ) {
    'use strict';

    var initialize = function() {
        $scope.SignInService = SignInService;

        $scope.$watch('SignInService.user', function() {
            if (SignInService.user == null){
                $scope.selectedDrug = null;
                return;
            }

            $scope.selectedDrug = _.find(SignInService.user.drugs, { 'fdaId' : $routeParams.fdaId });
            if(!$scope.selectedDrug){
                swal({   title: "Error!", text: 'This drug is not associated with your profile.', type: "error", confirmButtonText: "Ok" });
            }
        });
    };
    initialize();

});
