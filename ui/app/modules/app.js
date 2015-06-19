
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
    .otherwise({
        redirectTo: '/'
    });
});
