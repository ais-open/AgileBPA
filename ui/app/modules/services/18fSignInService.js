angular.module('18f').service('SignInService', function(ProfileService) {

    this.USER_KEY = 'ais.user.token';

    var user = null;

    this.signIn = function(userIn) {
        localStorage[this.USER_KEY] = userIn.token;
        user = userIn;
        this.notifyObservers('signin');
    };

    this.signOut = function() {
        user = null;
        localStorage.removeItem(this.USER_KEY);
        this.notifyObservers('signout');
    };

    this.getProfile = function() {

        if (user == null) {
            var userId = localStorage[this.USER_KEY];
            if (typeof userId === 'undefined') {
                // no cached user and no user token
                return null;
            }

            // get it from the server
            user = ProfileService.get({
                user: userId
            });
            if (user == null) {
                this.signOut();
            }
        }

        return user;
    };

    this.observers = {};

    this.registerObserver = function(event, callback) {
        if (typeof this.observers[event] === 'undefined') {
            this.observers[event] = [];
        }
        this.observers[event].push(callback);
    };

    this.notifyObservers = function(event) {
        if (typeof this.observers[event] === 'undefined') {
            return; // nobody to notify
        }
        var len = this.observers[event].length;
        var i;
        for (i = 0; i < len; i++) {
            // execute each callback
            this.observers[event][i]();
        }
    };
});
