const { User } = require('../models');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        user: async (_, { _id }) => {
            return await User.findById(_id);
        },
        bookByTitle: async (_, { title }) => {
            // Implementation to search for a book by title, possibly querying an external API
        },
    },
    Mutation: {
        addUser: async (_, { username, email, password }) => {
            const user = new User({ username, email, password });
            return await user.save();
        },
        saveBook: async (_, { userId, book }) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.savedBooks.push(book);
            return await user.save();
        },
        removeBook: async (_, { userId, bookId }) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.savedBooks = user.savedBooks.filter(book => book.bookId !== bookId);
            return await user.save();
        },
    },
};

module.exports = resolvers;
