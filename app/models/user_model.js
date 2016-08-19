import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// create a schema for posts with a field, added extra fields
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  organizer: Number,
  password: String,
  fullname: String,
  image: String,
  website: String,
  facebook: String,
  linkedin: String,
  phone: Number,
  about: String,
  skills: Array,
});

UserSchema.set('toJSON', {
  virtuals: true,
});


UserSchema.pre('save', function beforeyYourModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  // when done run the next callback with no arguments
  // call next with an error if you encounter one
  // return next();

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

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
