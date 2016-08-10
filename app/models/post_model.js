import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const PostSchema = new Schema({
  title: String,
  content: String,
  tags: String,
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
