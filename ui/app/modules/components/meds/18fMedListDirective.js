/**
 * Usage:
 *     <ais-med-list />
 */
angular.module('18f').directive('aisMedList', function() {

    'use strict';

    return {
        restrict: 'EA',
        templateUrl: 'modules/components/meds/18fMedListTemplate.html',
        controller: '18fMedListController'
    };

});
