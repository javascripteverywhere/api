const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {AuthenticationError, ForbiddenError} = require('apollo-server-express');
const mongoose = require('mongoose');

require('dotenv').config();

const gravatar = require('../util/gravatar');


module.exports = {

    //Note
    newNote: async (parent, args, {models, user}) => {
        if (!user) {
            throw new Error("New notes create only authorized users");
        }

        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        });
    },

    deleteNote: async (parent, {id}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Delete notes for only authorized users!!!");
        }

        const note = await models.Note.findById(id);

        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("This note not for yours!!!");
        }

        try {
            await note.remove();
            return true;
        } catch (err) {
            return false;
        }
    },

    updateNote: async (parent, {content, id}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError("Update notes for only authorized users!!!");
        }

        const note = await models.Note.findById(id);

        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("This note not for yours!!!");
        }

        try {
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
        } catch (err) {
            throw new Error('Error updating note!!!');
        }
    },

    //User auth
    singUp: async (parent, {username, email, password}, {models}) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            })
            return jwt.sign({id: user._id}, process.env.JWT_SECRET)
        } catch (e) {
            throw new Error("Error! Fail creat new user");
        }
    },

    singIn: async (parent, {username, email, password}, {models}) => {
        if (email) {
            email = email.trim().toLowerCase();
        }

        const user = await models.User.findOne({
            $or: [{email}, {username}]
        });

        if (!user) {
            throw new Error("Error! Auth error");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Error! Auth error");
        }

        return jwt.sign({id: user._id}, process.env.JWT_SECRET)
    }


};
