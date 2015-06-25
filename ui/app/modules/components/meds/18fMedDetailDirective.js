/**
 * Usage:
 *     <ais-med-list />
 */
angular.module('18f').directive('aisMedDetail', function() {

    'use strict';

    return {
        restrict: 'EA',
        templateUrl: 'modules/components/meds/18fMedDetailTemplate.html',
        controller: '18fMedDetailController'
    };

});
