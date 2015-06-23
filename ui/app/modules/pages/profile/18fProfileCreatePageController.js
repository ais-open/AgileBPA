angular.module('18f').controller('18fProfileCreatePageController', function($scope, $location, SignInService) {
    'use strict';

    var goHome = function() {
        $location.path('/');
    }
    var userSignedIn = function() {
        console.log('User created and signed in!');
        // go to the home page
        goHome();
    };

    var initialize = function() {
        SignInService.registerObserver('signin', userSignedIn);
        SignInService.registerObserver('signout', goHome);
    };
    initialize();
});
