import jwt from 'jwt-simple';
import config from '../config';
import UserModel from '../models/user_model';


const cleanID = (input) => {
  return { id: input._id, email: input.email, organizer: input.organizer };
};

const cleanIDs = (inputs) => {
  return inputs.map(input => {
    return cleanID(input);
  });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  UserModel.findOne({ email })
      .then((user) => {
        if (user) {
          return res.status(422).send('User already exists');
        } else {
          const User = new UserModel();
          User.email = email;
          User.password = password;
          User.organizer = 0;
          User.save()
          .then(
            // return a token
            res.send({ token: tokenForUser(user) })
          );
        }
      });
};

export const getProfile = (req, res) => {
  console.log('getting here');
  UserModel.findById(req.params.id).then(result => {
    if (result !== null) {
      res.json({ user: result });
    } else {
      res.json({ message: 'Error in findOne' });
    } }).catch(error => {
      res.json({ message: 'Error in findOne' });
    });
};

export const getUsers = (req, res) => {
  UserModel.find()
  .then(results => {
    res.json(cleanIDs(results));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deleteUser = (req, res) => {
  res.json({ message: `User successfully deleted: id: ${req.params.id}` });
  UserModel.findById(req.params.id).remove()
  .then(result => {
    res.json({ message: `User successfully deleted: id: ${req.params.id}` });
  })
  .catch(error => {
    res.json({ error });
  });
};
