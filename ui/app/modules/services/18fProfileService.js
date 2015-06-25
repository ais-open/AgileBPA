angular.module('18f').service('ProfileService', function(ProfileApi, appConfig, $http, $q) {

    this.USER_KEY = 'ais.user.token';

    this.user = null;

    this.authenticate = function(obs) {
        var deferred = $q.defer();
        var svc = this;
        var url = appConfig.api + 'user/authenticate';
        $http.post(url, obs).success(function(data, status, headers, config) {
            ProfileApi.get({
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
            this.user = userIn;
        }
    };

    this.signOut = function() {
        this.user = null;
        localStorage.removeItem(this.USER_KEY);
    };

    this.loadServerProfile = function() {
        var deferred = $q.defer();
        var userId = localStorage[this.USER_KEY];
        if (typeof userId === 'undefined') {
            deferred.resolve(null);
        }

        ProfileApi.get({
            user: userId
        }, function(result) {
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    this.refreshProfile = function() {
        var deferred = $q.defer();
        var svc = this;
        svc.loadServerProfile().then(function(u) {
            svc.user = u;
            deferred.resolve(svc.user);
        });
        return deferred.promise;
    };
    this.refreshProfile();

});
