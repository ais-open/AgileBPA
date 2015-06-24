angular.module('18f').service('SignInService', function(ProfileService, appConfig, $http, $q) {

    this.USER_KEY = 'ais.user.token';

    var user = null;

    this.authenticate = function(obs) {
        var deferred = $q.defer();
        var svc = this;
        var url = appConfig.api + 'user/authenticate';
        $http.post(url, obs).success(function(data, status, headers, config) {
            ProfileService.get({
                user: data.token
            }, function(u) {
                svc.signIn(u);
                deferred.resolve(true);
            });
        }).error(function(data, status, headers, config) {
            deferred.resolve(false);
        });

        return deferred.promise;
    };

    this.signIn = function(userIn) {
        if (typeof userIn === 'undefined' || typeof userIn.token === 'undefined') {
            this.signOut();
        }
        else {
            localStorage[this.USER_KEY] = userIn.token;
            user = userIn;
            this.notifyObservers('signin');
        }
    };

    this.signOut = function() {
        user = null;
        localStorage.removeItem(this.USER_KEY);
        this.notifyObservers('signout');
    };

    this.getProfileByToken = function(token) {
        return ProfileService.get({
            user: token
        });
    };

    this.getProfile = function() {
        if (user == null) {
            var userId = localStorage[this.USER_KEY];
            if (typeof userId === 'undefined') {
                // no cached user and no user token
                return null;
            }

            // get it from the server
            user = this.getProfileByToken(userId);
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
