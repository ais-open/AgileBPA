/**
 * Usage:
 *     <ais-navbar />
 */
angular.module('18f').directive('aisNavbar', function() {

    'use strict';

    return {
        restrict: 'EA',
        templateUrl: 'modules/components/navbar/18fNavbarTemplate.html',
        controller: '18fNavbarController'
    };

});
