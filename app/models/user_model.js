import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// create a schema for posts with a field
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  fullname: String,
  website: String,
  linkedin: String,
  about: String,
  skills: String,
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;
  if (!user.isModified('password')) return next();

  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

        // overwrite plain text password with encrypted password
      user.password = hash;
      return next();
    });
  });
});

// note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

const cleanUser = (input) => {
  return { id: input._id, email: input.email, fullname: input.fullname,
    website: input.website, linkedin: input.linkedin, about: input.about,
    skills: input.skills };
};

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
