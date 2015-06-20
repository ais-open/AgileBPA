
if (typeof console === 'undefined') {
    console = {
        log: function() {}
    };
}

var app = angular.module('18f', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',

    //'ui.bootstrap'
]);

app.config(function($routeProvider) {

    $routeProvider
    .when('/', {
        controller: '18fMainPageController',
        templateUrl: 'modules/pages/18fMainPageTemplate.html'
    })
    .when('/about', {
        controller: '18fAboutPageController',
        templateUrl: 'modules/pages/18fAboutPageTemplate.html'
    })
    .when('/profile/create', {
        controller: '18fUserAddPageController',
        templateUrl: 'modules/pages/user/18fUserAddPageTemplate.html'
    })
    .when('/profile', {
        controller: '18fUserProfilePageController',
        templateUrl: 'modules/pages/user/18fUserProfilePageTemplate.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});
