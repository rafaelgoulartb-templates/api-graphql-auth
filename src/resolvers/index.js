const User = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = {
  Query: {},
  Mutation: {
    register: async (_, { name, email, password }) => {
      // Validation
      if (validator.isEmpty(name)) {
        throw new Error("The name address must not be empty.");
      }
      if (!validator.isLength(email, { max: 250 })) {
        throw new Error("The email must be at a maximum 250 characters long.");
      } else if (!validator.isEmail(email)) {
        throw new Error("It is not a valid email.");
      }
      if (validator.isEmpty(password)) {
        throw new Error("The password filed must not be empty.");
      } else if (!validator.isLength(password, { min: 6 })) {
        throw new Error("The password must have minimum 6 characters.");
      }
      // Create
      const verifyEmailExist = await User.findOne({ email });
      if (verifyEmailExist) throw new Error("Email already exist");

      const user = await User.create({ name, email, password });
      const token = jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: 8640000,
      });

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt,
        token: token,
      };
    },

    login: async (_, { email, password }) => {
      // Validation
      if (validator.isEmpty(email)) {
        throw new Error("The email address must not be empty.");
      } else if (!validator.isLength(email, { max: 250 })) {
        throw new Error("The email must be at a maximum 250 characters long.");
      } else if (!validator.isEmail(email)) {
        throw new Error("It is not a valid email.");
      }
      if (validator.isEmpty(password)) {
        throw new Error("The password filed must not be empty.");
      } else if (!validator.isLength(password, { min: 6 })) {
        throw new Error("The password must have minimum 6 characters.");
      }
      // Login
      const user = await User.findOne({ email });

      if (!user) throw new Error("User not found");
      if (!(await bcrypt.compareSync(password, user.password)))
        throw new Error("Incorrect password");

      const token = jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: 8640000,
      });

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt,
        token: token,
      };
    },
  },
};
