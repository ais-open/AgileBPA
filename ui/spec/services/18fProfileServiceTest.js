
describe('18fProfileApi', function() {

    var profileService;

    beforeEach(module('18f'));

    beforeEach(inject(function(_ProfileApi_) {
        profileService = _ProfileApi_;
    }));

    it('should connect to api', function() {
        //var profiles = profileService.query();
        //console.log('Profiles: ' + JSON.stringify(profiles));
        // var testUser = {
        //     firstName: 'Jerome',
        //     lastName: 'Horwitz',
        //     email: 'curly@gmail.com'
        // };
        // profileService.save(testUser, function(savedUser) {
        //     console.log('User: ' + JSON.stringify(savedUser));
        // });
        //var profiles = profileService.query();
        //console.log('Profiles: ' + JSON.stringify(profiles));
    });
});
