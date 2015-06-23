angular.module('18f').controller('18fProfileCreatePageController', function($scope, $location, SignInService) {
    'use strict';

    var userSignedIn = function() {
        console.log('User created and signed in!');
        // go to the home page
        $location.path('/');
    };

    var initialize = function() {
        SignInService.registerObserver('signin', userSignedIn);
    };
    initialize();
});
