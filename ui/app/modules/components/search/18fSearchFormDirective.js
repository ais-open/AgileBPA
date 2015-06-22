/**
 * Usage:
 *      <ais-search-form />
 */
angular.module('18f').directive('aisSearchForm', function() {
    'use strict';

    return {
        restrict: 'EA',
        templateUrl: 'modules/components/search/18fSearchFormTemplate.html',
        controller: '18fSearchFormController'
    };
});
