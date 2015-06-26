angular.module('18f').controller('18fMedDetailController', function($scope, $routeParams, $location, ProfileService, ProfileApi ) {
    'use strict';

    var initialize = function() {
        $scope.ProfileService = ProfileService;

        $scope.$watch('ProfileService.user', function() {
            if (ProfileService.user == null){
                $scope.selectedDrug = null;
                return;
            }

            $scope.selectedDrug = _.find(ProfileService.user.drugs, { 'fdaId' : $routeParams.fdaId });
            if(!$scope.selectedDrug){
                swal({   title: "Error!", text: 'This drug is not associated with your profile.', type: "error", confirmButtonText: "Ok" });
            }
        });

        $scope.confirmRemoval = function(){
            swal({
                title: "Are you sure?",
                text: "This medication will be removed from your profile.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, remove it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: true },
                function(isConfirm){
                    if (isConfirm){
                        $scope.removeDrug();
                    }
                    else{

                    }
                }
            );
        };

        $scope.removeDrug = function(){
            var payload = {
                fdaId: $scope.selectedDrug.fdaId//,
                //userComments: 'deleted via Details Page'
            };
            ProfileApi.removeUserDrug({
                user: ProfileService.user.token,
                fdaId: payload.fdaId
            })
            .$promise.then(function(data){
                swal({
                    title: "Deleted!",
                    text: $scope.selectedDrug.brandName[0] + " has been remove from your list of medications.",
                    type: "success",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true,
                    closeOnCancel: true},
                    function(){
                        // then redirect to Meds List
                        swal.close();
                        ProfileService.refreshProfile();
                        $location.path('/meds');
                        if (!$scope.$$phase) {
                           $scope.$apply();
                        }
                    });
            }, function(err) {
                debugger;
                console.log('Error: ' + err.data)
                swal({   title: "Error!", text: 'Error encountered when removing from your list of medications.', type: "error", confirmButtonText: "Ok" });
                ProfileService.refreshProfile();
            });
        };
    };
    initialize();

});
