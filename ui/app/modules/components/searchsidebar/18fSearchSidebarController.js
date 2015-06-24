angular.module('18f').controller('18fSearchSidebarController', function($scope,SearchService,SignInService,ProfileService) {
    'use strict';
    var initialize = function(){
        $scope.showResults = false;
        $scope.showSearching = false;
        $scope.term = '';
        $scope.drug = null;
        $scope.results = [];
    };

    $scope.search = function(term){
        // $scope.drug = null;
        // $scope.showSearching = true;
        // $scope.showResults = false;

        return SearchService.search({ term: term }).$promise;
    };

    $scope.addUserDrug = function(drug){
        debugger;
        if($scope.profile){
            var payload = {
                fdaId: drug.fdaId,
                userComments: 'added via Search'
            };
            ProfileService.addUserDrug({ user: $scope.profile.token}, payload).$promise.then(function(){
                $scope.drug = drug;
                $scope.showSearching = false;
                $scope.showResults = false;
            });
        }

    };

    initialize();
});
