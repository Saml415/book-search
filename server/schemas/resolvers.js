const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user_id }).populate("savedBooks");
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },

  Mutation: {
    async addUser(parent, { username, email, password }) {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new AuthenticationError("Something is Wrong!");
      }
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong password!");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true }
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  removeBook: async (parent, { bookId }, context) => {
    if (context.user) {
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: bookId } },
        { new: true }
      );

      return user;
    }
    throw new AuthenticationError("You need to be logged in!");
  },
};

module.exports = resolvers;
