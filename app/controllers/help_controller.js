import Help from '../models/help_model';

// helpid is the actual id of the help message, the other is the user's id
const cleanID = (input) => {
  return { helpid: input._id, message: input.message, category: input.category, id: input.id };
};

const cleanIDs = (inputs) => {
  return inputs.map(input => {
    return cleanID(input);
  });
};

export const createHelp = (req, res) => {
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

export const getHelp = (req, res) => {
  Help.find().sort({ createdAt: -1 })
  .then(results => {
    res.json(cleanIDs(results));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deleteHelp = (req, res) => {
  Help.findById(req.params.id).remove()
  .then(result => {
    res.json({ message: 'delete success' });
  })
  .catch(error => {
    res.json({ error });
  });
};
