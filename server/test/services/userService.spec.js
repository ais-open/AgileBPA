'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
mongoose.connect(''); // fake a connection, mockgoose intercepts this and sets up an in-memory database

var userModel = require('../../models/user')();
var userService = require('../../services/userService')(userModel);

var _ = require('lodash');
var should = require('should');

describe('UserService', function() {
    var userFixture;

    beforeEach(function(done) {
        // Arrange
        mockgoose.reset();
        userFixture = new userModel(require('../fixtures/user.json'));
        userFixture.save(done);
    });

    it('should retrieve a stored user', function(done) {
        // Act
        userService.getUserByToken(userFixture.token, function(data) {
            // Assert
            data.firstName.should.equal('Joe');
            data.lastName.should.equal('User');
            data.email.should.equal('foo@bar.com');
            data.password.should.equal('p@ssw0rd');
            data.token.should.equal('12345');

            done();
        })
    });

    it('should add a drug to a user\'s cabinet', function(done) {
        // Act
        var drugToAdd = {
            fdaId: '750fd441-8432-4b6d-b48d-5db566a90e3f',
            userComments: 'For headaches'
        };
        userService.addUserDrug(userFixture.token, drugToAdd, function(err) {
            // Assert
            err.should.not.be.ok;

            userService.getUserByToken(userFixture.token, function(userDoc) {
                _.find(userDoc.drugs, { 'fdaId' : drugToAdd.fdaId }).should.be.ok;
                done();
            });
        });
    })

});
