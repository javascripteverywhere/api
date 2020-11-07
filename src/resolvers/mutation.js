// for hashing user passwords
const bcrypt = require('bcrypt');
// for generating and validating tokens
const jwt = require('jsonwebtoken');

const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config()

const gravatar = require('../util/gravatar');
const { models } = require('mongoose');

module.exports = {
    signUp: async(parent, {username, email, password}, {models}) => {
        // normalize the email address 
        email = email.trim().toLowerCase()
        //hass the password
        const hashed = await bcrypt.hash(password, 10);
        // create avatar url
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                email,
                avatar, 
                password: hashed
            });

            // create and return json token
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        } catch (err) {
            console.log(err);
            throw new Error('Error creating account');
        }
    },
    signIn: async (parent, { username, email, password }, {models}) => {
        if (email) {
            // normalize email
            email = email.trim().toLowerCase();
        }
        
        const user = await models.User.findOne({
            $or: [{email}, {username}]
        });
        
        // if no user is found throw an authentication error
        if (!user) {
            throw new AuthenticationError('Error signing in');
        }

        // if passwords don't match, throw authentication error
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('Error signing in')
        }

        //create and return new json token
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: 'Leslie Roriguez'
        });
    },
    deleteNote: async (parent, args, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: args.id });
            return true; 
        } catch (err) {
            return false
        }
    },
    updateNote: async (parent, { id, content }, { models }) => {
        return await models.Note.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        );
    }
}
