angular.module('18f').controller('18fSearchSidebarController', function($scope,SearchService,SignInService,ProfileService) {
    'use strict';
    var initialize = function(){
        $scope.showResults = false;
        $scope.showSearching = false;
        $scope.term = '';
        $scope.drug = null;
        $scope.results = [];
    };

    $scope.search = function(){
        $scope.drug = null;
        $scope.showSearching = true;
        $scope.showResults = false;
        $scope.results = SearchService.search({ term: $scope.searchTerm },function(){
            debugger;
            $scope.showSearching = false;
            $scope.showResults = true;
        },function(){
            console.log('Error searching.');
        });
    };

    $scope.addUserDrug = function(drug){
        console.log(drug.fdaId);
        debugger;
        if($scope.profile){
            ProfileService.addUserDrug({ user: $scope.profile.token },function(){
                $scope.drug = drug;
                $scope.showSearching = false;
                $scope.showResults = false;
            },function(){
                console.log('Error searching.');
            });
        }

    };

    initialize();
});
