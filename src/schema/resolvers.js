const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const config = require("../config");
const { validateRegister } = require("../utils/validators");

module.exports = {
  Query: {
    users: () => User.find(),
    posts: () => Post.find().populate("user"),
    comments: () =>
      Comment.find().populate("user").populate("post")
  },

  Mutation: {
    async register(_, { username, email, password }) {
      const error = validateRegister(username, email, password);
      if (error) throw new Error(error);

      const hash = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hash
      });

      const token = jwt.sign({ id: user.id }, config.JWT_SECRET);

      return { ...user._doc, id: user._id, token };
    },

    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Wrong password");

      const token = jwt.sign({ id: user.id }, config.JWT_SECRET);
      return { ...user._doc, id: user._id, token };
    },

    async createPost(_, { title, body }, { user }) {
      if (!user) throw new Error("Auth required");

      return Post.create({
        title,
        body,
        user: user.id
      });
    },

    async updatePost(_, { id, title, body }, { user }) {
      if (!user) throw new Error("Auth required");

      return Post.findByIdAndUpdate(id, { title, body }, { new: true });
    },

    async deletePost(_, { id }, { user }) {
      if (!user) throw new Error("Auth required");

      return Post.findByIdAndDelete(id);
    },

    async createComment(_, { postId, text }, { user }) {
      if (!user) throw new Error("Auth required");

      return Comment.create({
        text,
        user: user.id,
        post: postId
      });
    }
  }
};
