/**
 * Usage:
 *      <ais-sidebar />
 */
angular.module('18f').directive('aisSearchSidebar', function() {
    'use strict';

    return {
        restrict: 'EA',
        templateUrl: 'modules/components/searchsidebar/18fSearchSidebarTemplate.html',
        controller: '18fSearchSidebarController'
    };
});
