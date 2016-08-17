import User from '../models/user_model';
import jwt from 'jwt-simple';
import config from '../config';

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

export const signin = (req, res, next) => {
  User.findOne({ _id: req.user._id })
  .then(result => {
    res.send({ token: tokenForUser(req.user), id: req.user._id });
  })
  .catch(error => {
    res.json({ message: 'Error in looking up user id' });
  });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  // here you should do a mongo query to find if a user already exists with this email.
  User.findOne({ email })
  .then(result => {
    if (result !== null) {
      // if user exists then return an error.
      return res.status(422).send('A user with this email already exists');
    } else {
      // if not, use the User model to create a new user.
      const user = new User();
      user.email = email;
      user.password = password;

      // Save the new User object
      // this is similar to how you created a Post
      user.save()
      .then(
        // return a token
        res.json({ token: tokenForUser(user), id: user._id })
      )
      .catch(error => {
        res.json({ message: 'Error in save' });
      });
    }
  })
  .catch(error => {
    res.json({ message: 'Error in findOne' });
  });
};

export const getProfile = (req, res) => {
  console.log('getting here');
  User.findById(req.params.id)
  .then(result => {
    if (result !== null) {
      res.json({ id: req.params.id });
    } else {
      res.json({ message: 'Error in findOne' });
    }
  })
  .catch(error => {
    res.json({ message: 'Error in findOne' });
  });
};
