angular.module('18f').factory('ProfileApi', function($resource, appConfig) {
    var url = appConfig.api + 'user/:user';
    return $resource(url, {
        user: '@user'
    },{
        'addUserDrug': { method: 'POST', url: url + '/drug' },
        'removeUserDrug': { method: 'DELETE', url: url + '/drug/:fdaId' },
        'patch': { method: 'PATCH' }
    });
});
