angular.module('18f').controller('18fSearchSidebarController', function($scope,SearchService,SignInService) {
    'use strict';
    var initialize = function(){
        $scope.showResults = false;
        $scope.showSearching = false;
        $scope.term = '';
        $scope.results = [];
        $scope.loggedIn = false;
        $scope.user = SignInService.getProfile();
        if($scope.user !== null){
            $scope.loggedIn = true;
        }
    };

    $scope.search = function(){
        $scope.showSearching = true;
        $scope.showResults = false;
        $scope.results = SearchService.search({ term: $scope.searchTerm },function(){
            $scope.showSearching = false;
            $scope.showResults = true;
        },function(){

        });
    };

    $scope.addUserDrug = function(drug){
        console.log(drug.fdaId);
    };

    initialize();
});
