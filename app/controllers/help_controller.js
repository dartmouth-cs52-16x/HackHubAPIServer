import Help from '../models/help_model';


// const cleanID = (input) => {
//   return { id: input._id, text: input.text, date: input.date };
// };
//
// const cleanIDs = (inputs) => {
//   return inputs.map(input => {
//     return cleanID(input);
//   });
// };

export const createHelp = (req, res) => {
  const help = new Help();
  console.log('trying to create help');
  help.message = req.body.message;
  help.category = req.body.category;
  help.email = req.body.email;
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
    res.json(results);
  })
  .catch(error => {
    res.json({ error });
  });
};
