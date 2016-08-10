import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

UserSchema.set('toJSON', {
  virtuals: true,
});

// create model class
const UserModel = mongoose.model('Post', UserSchema);

export default UserModel;
