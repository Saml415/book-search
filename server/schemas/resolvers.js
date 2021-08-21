// const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {},

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
  },
};

module.exports = resolvers;
