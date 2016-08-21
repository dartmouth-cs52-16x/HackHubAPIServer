import jwt from 'jwt-simple';
import config from '../config';
import UserModel from '../models/user_model';


const cleanID = (input) => {
  return { id: input._id,
    role: input.role,
    fullname: input.fullname,
    image: input.image,
    facebook: input.facebook,
    linkedin: input.linkedin,
    website: input.website,
    phone: input.phone,
    about: input.about,
    skills: input.skills };
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
  res.send({ token: tokenForUser(req.user), user: req.user._id, role: req.user.role });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.fullname;
  const password = req.body.password;
  const role = req.body.role;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  UserModel.findOne({ email })
      .then((user) => {
        if (user) {
          return res.status(422).send('User already exists');
        } else {
          const User = new UserModel();
          User.fullname = name;
          User.email = email;
          User.password = password;
          User.role = role;
          User.save()
          .then(
            // return a token
            res.send({ token: tokenForUser(User), user: User._id, role: User.role })
          );
        }
      });
};

export const getProfile = (req, res) => {
  console.log('getting here');
  UserModel.findById(req.params.id).then(result => {
    if (result !== null) {
      console.log(result);
      res.json({ user: cleanID(result) });
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
  UserModel.findById(req.params.id).remove()
  .then(result => {
    res.json({ message: `User successfully deleted: id: ${req.params.id}` });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updateUser = (req, res) => {
  UserModel.findById(req.body.id)
  .then(result => {
    const update = result;
    update.image = req.body.image;
    update.website = req.body.website;
    update.facebook = req.body.facebook;
    update.linkedin = req.body.linkedin;
    update.about = req.body.about;
    update.phone = req.body.phone;
    update.skills = req.body.skills;
    update.save();
    res.json(cleanID(update));
  })
  .catch(error => {
    res.json({ error });
  });
};
