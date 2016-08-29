// controller for help messages

import Help from '../models/help_model';

// helpid is the actual id of the help message, the other is the user's id
const cleanID = (input) => {
  return { helpid: input._id, message: input.message, category: input.category, id: input.id };
};

// clean multiple ids
const cleanIDs = (inputs) => {
  return inputs.map(input => {
    return cleanID(input);
  });
};

// create a new help message
export const createHelp = (req, res) => {
  console.log(req.user.role);
  if (req.user.role !== 'hacker' && req.user.role !== 'recruiter') {
    return res.status(401).send('You are not authorized for this action');
  }
  const help = new Help();
  console.log('trying to create help');
  help.message = req.body.message;
  help.category = req.body.category;
  help.id = req.body.id;
  help.save()
  .then(result => {
    console.log('help created');
    res.json({ message: 'help created!' });
  })
  .catch(error => {
    console.log('help not created');
    res.json({ error });
  });
};

// get all help messages
export const getHelp = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(401).send('You are not authorized for this action');
  }
  Help.find().sort({ createdAt: -1 })
  .then(results => {
    res.json(cleanIDs(results));
  })
  .catch(error => {
    res.json({ error });
  });
};

// delete a help message
export const deleteHelp = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(401).send('You are not authorized for this action');
  }
  Help.findById(req.params.id).remove()
  .then(result => {
    res.json({ message: 'delete success' });
  })
  .catch(error => {
    res.json({ error });
  });
};
