/**
 * Usage:
 *      <ais-profile-create-form />
 */
angular.module('18f').directive('aisProfileCreateForm', function() {
    'use strict';

    return {
        restrict: 'EA',
        templateUrl: 'modules/components/profile/18fProfileCreateFormTemplate.html',
        controller: '18fProfileCreateFormController'
    };
});
