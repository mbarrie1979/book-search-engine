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
      // Placeholder for book search by title logic
      throw new Error('Not implemented');
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      return user;
    },
    saveBook: async (_, { userId, book }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.savedBooks.push(book);
      await user.save();
      return user;
    },
    removeBook: async (_, { userId, bookId }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.savedBooks = user.savedBooks.filter(book => book.bookId !== bookId);
      await user.save();
      return user;
    },
  },
  User: {
    bookCount: (parent) => parent.savedBooks.length,
  },
};

module.exports = resolvers;
