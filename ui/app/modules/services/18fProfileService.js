angular.module('18f').factory('ProfileService', function($resource, appConfig) {
    var url = appConfig.api + 'user/:user';
    return $resource(url, {
        user: '@user'
    },{
        'addUserDrug': { method: 'POST', url: url + '/drug' },
        'patch': { method: 'PATCH' }
    });
});
