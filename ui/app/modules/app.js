
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

    'ui.bootstrap'
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
    .when('/meds', {
        controller: '18fMedsPageController',
        templateUrl: 'modules/pages/meds/18fMedsPageTemplate.html'
    })
    .when('/meds/:fdaId', {
        controller: '18fMedsDetailPageController',
        templateUrl: 'modules/pages/meds/18fMedsDetailPageTemplate.html'
    })
    .when('/profile/create', {
        controller: '18fProfileCreatePageController',
        templateUrl: 'modules/pages/profile/18fProfileCreatePageTemplate.html'
    })
    .when('/profile/signin', {
        controller: '18fProfileSignInPageController',
        templateUrl: 'modules/pages/profile/18fProfileSignInPageTemplate.html'
    })
    .when('/profile', {
        controller: '18fProfilePageController',
        templateUrl: 'modules/pages/profile/18fProfilePageTemplate.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});
