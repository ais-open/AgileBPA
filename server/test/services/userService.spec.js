'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
mongoose.connect(''); // fake a connection, mockgoose intercepts this and sets up an in-memory database

var UserModel = require('../../models/user')();
var userService = require('../../services/userService')(UserModel);

var _ = require('lodash');
var should = require('should');

describe('UserService', function() {
    var userFixture;

    beforeEach(function(done) {
        // Arrange
        mockgoose.reset();
        userFixture = require('../fixtures/user.json');
        var fixtureModel = new UserModel(userFixture);
        fixtureModel.save(done);
    });

    it('should retrieve a stored user', function(done) {
        // Act
        userService.getUserByToken(userFixture.token, function(data) {
            // Assert
            data.firstName.should.equal('Joe');
            data.lastName.should.equal('User');
            data.email.should.equal('foo@bar.com');
            data.token.should.equal('12345');

            done();
        })
    });

    it('should authenticate a user', function(done) {
        userService.authenticateUser(userFixture.email, userFixture.passwordUnencrypted, function(userDoc) {
            userDoc.should.be.ok;
            done();
        });
    });

    it('should add a user', function(done) {
        // Act
        var userToAdd = {
            firstName: 'John',
            lastName: 'Deere',
            email: 'John@Deere.com',
            password: 's3cr3t'
        };

        userService.addUser(userToAdd, function(err, user) {
            // Assert
            userService.getUserByToken(user.token, function(retrievedUser) {
                retrievedUser.firstName.should.equal('John');
                retrievedUser.lastName.should.equal('Deere');
                retrievedUser.email.should.equal('John@Deere.com');
                done();
            });
        });
    });

});
