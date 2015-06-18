angular.module('18f').controller('18fMainPageController', function($scope) {
    'use strict';

    var initialize = function() {
        $scope.greetings = ['hi', 'howdy', 'hello'];
    };
    initialize();
});
