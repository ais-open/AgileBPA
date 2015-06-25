/**
 * Usage:
 *      <ais-profile-edit-form />
 */
angular.module('18f').directive('aisProfileEditForm', function() {
    'use strict';

    return {
        restrict: 'EA',
        templateUrl: 'modules/components/profile/18fProfileEditFormTemplate.html',
        controller: '18fProfileEditFormController'
    };
});
