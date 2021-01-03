const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  comments: [
    {
      username: String,
      body: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.ObjectId,
    ref: 'users'
  }
});

const Post = model('Post', postSchema);
module.exports = Post;

