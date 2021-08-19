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
  },
};

module.exports = resolvers;
