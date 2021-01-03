const { AuthenticationError } = require('apollo-server');
const Post = require('../../models/post');
const User = require('../../models/user');
const validateUser = require('../../utils/checkAuth')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({createdAt: -1});
        return posts;
      } catch(err) {
        return err;
      }
    },

    async getPost(_, args) {
    const { id } = args;
      try {
        const post = await Post.findById(id);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found')
        }
      } catch(err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async deletePost(_, args, context) {
      const { id } = args;
      const user = validateUser(context);
      const post = await Post.findById(id);
    try {
      if (user.username === post.username) {
        await post.delete();
        return "Post Successfully deleted";
      } else {
        throw new AuthenticationError("Must be signed in as a user to delete a post");
      }
    } catch (err) {
        throw new Error(err);
      } 
    },

    async createPost(_, args, context) {
      const user = validateUser(context);
      const { body } = args;
      try {
        let newPost = new Post({ 
          username: user.username,
          user: user.id,
          body, 
          createdAt: new Date().toISOString()
        });
        let post = await newPost.save();
        return post;
      } catch(err) {
        throw new Error(err);
      }
    }
  }
};