angular.module('18f').controller('18fMedsDetailPageController', function($scope) {
    'use strict';

    $scope.selectedDrug = null;

    $scope.selectDrug = function(drug){
        $scope.selectedDrug = drug;
    };

    $scope.unselectDrug = function(){
        $scope.selectedDrug = null;
    }

});
