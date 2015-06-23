/**
 * Usage:
 *      <ais-profile />
 */
angular.module('18f').directive('aisProfile', function() {
    'use strict';

    return {
        restrict: 'EA',
        templateUrl: 'modules/components/profile/18fProfileTemplate.html',
        controller: '18fProfileController',
        scope: {
            showTools: '@'
        }
    };
});
