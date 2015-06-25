angular.module('18f').factory('SearchApi', function($resource, appConfig) {
    var url = appConfig.api + 'drug?term=:term';
    return $resource(url, null,
    {
        'search': { method: 'GET', isArray: true }
    });
});
