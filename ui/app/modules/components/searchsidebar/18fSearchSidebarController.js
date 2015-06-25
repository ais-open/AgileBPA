angular.module('18f').controller('18fSearchSidebarController',
    function($scope, SearchService, SignInService, ProfileService) {

    'use strict';

    var initialize = function(){
        $scope.showResults = false;
        $scope.showSearching = false;
        $scope.term = '';
        $scope.drug = null;
        $scope.results = [];

        $scope.SignInService = SignInService;
    };

    $scope.search = function(term){
        // $scope.drug = null;
        // $scope.showSearching = true;
        // $scope.showResults = false;
        return SearchService.search({ term: term }).$promise;
    };

    $scope.addUserDrug = function(drug){
        if (typeof SignInService.user === 'undefined' || SignInService.user == null) {
            console.log('Tried to add drug to anonymous user!');
            return;
        }

        //console.log($scope.profile);
        var payload = {
            fdaId: drug.fdaId,
            userComments: 'added via Search'
        };
        ProfileService.addUserDrug({
            user: SignInService.user.token
            }, payload
        ).$promise.then(function(data){
            $scope.drug = drug;
            $scope.showSearching = false;
            $scope.showResults = false;
            swal({   title: "Success!",   text: drug.brandName[0] + " has been added to your list of medications.",   type: "success",   confirmButtonText: "Ok", timer: 3000 });
            SignInService.refreshProfile();
        }, function(err) {
            console.log('Error: ' + err.data)
            swal({   title: "Error!", text: err.data, type: "error", confirmButtonText: "Ok" });
            SignInService.refreshProfile();
        });
    };

    initialize();
});
