module.exports = {
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
