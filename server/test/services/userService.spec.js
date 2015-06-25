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

    it('should sort drugs by brand name', function(done) {
        // Act
        userService.getUserByToken(userFixture.token, function(data) {
            // Assert
            data.drugs[0].fdaId.should.equal('1f1e2252-f884-4294-a0e5-6c4ea7d03c3d'); // Aleve
            data.drugs[1].fdaId.should.equal('2ba90e61-fe6b-487c-8fbc-847211595345'); // Infants Tylenol
            data.drugs[2].fdaId.should.equal('44e1e7b4-d867-4aab-9a51-7a72456eeaa0'); // Theraflu
            done();
        });
    });

});
