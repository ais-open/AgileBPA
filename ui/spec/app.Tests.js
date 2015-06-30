describe('Routes', function () {
    beforeEach(module('18f'));

    it('should test the 18F routes',
        inject(function ($route) {

            expect($route.routes['/'].controller).toBe('18fMainPageController');
            expect($route.routes['/'].templateUrl).toEqual('modules/pages/18fMainPageTemplate.html');

            expect($route.routes['/about'].controller).toBe('18fAboutPageController');
            expect($route.routes['/about'].templateUrl).toEqual('modules/pages/18fAboutPageTemplate.html');

            expect($route.routes['/meds'].controller).toBe('18fMedsPageController');
            expect($route.routes['/meds'].templateUrl).toEqual('modules/pages/meds/18fMedsPageTemplate.html');

            expect($route.routes['/meds/:fdaId'].controller).toBe('18fMedsDetailPageController');
            expect($route.routes['/meds/:fdaId'].templateUrl).toEqual('modules/pages/meds/18fMedsDetailPageTemplate.html');

            expect($route.routes['/profile/create'].controller).toBe('18fProfileCreatePageController');
            expect($route.routes['/profile/create'].templateUrl).toEqual('modules/pages/profile/18fProfileCreatePageTemplate.html');

            expect($route.routes['/profile/signin'].controller).toBe('18fProfileSignInPageController');
            expect($route.routes['/profile/signin'].templateUrl).toEqual('modules/pages/profile/18fProfileSignInPageTemplate.html');

            expect($route.routes['/profile'].controller).toBe('18fProfilePageController');
            expect($route.routes['/profile'].templateUrl).toEqual('modules/pages/profile/18fProfilePageTemplate.html');

            expect($route.routes[null].redirectTo).toEqual('/');
        })
    );

    it('should gracefully handle no console object', function () {
        pending();
        //expect(console.log).toEqual(jasmine.any(Function));
    });
});