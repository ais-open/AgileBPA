/**
 * Usage:
 *      <ais-sidebar />
 */
angular.module('18f').directive('aisSidebar', function() {
    'use strict';

    return {
        restrict: 'EA',
        templateUrl: 'modules/components/sidebar/18fSidebarTemplate.html',
        controller: '18fSidebarController'
    };
});
