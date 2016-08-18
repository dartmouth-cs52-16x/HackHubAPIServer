import Announcement from '../models/announcement_model';


const cleanID = (input) => {
  return { id: input._id, text: input.text, date: input.date };
};

const cleanIDs = (inputs) => {
  return inputs.map(input => {
    return cleanID(input);
  });
};

export const createAnn = (req, res) => {
  const announcement = new Announcement();
  announcement.text = req.body.text;
  announcement.date = req.body.date;
  announcement.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getAnns = (req, res) => {
  Announcement.find().sort({ createdAt: -1 })
  .then(results => {
    res.json(cleanIDs(results));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deleteAnn = (req, res) => {
  Announcement.findById(req.params.id).remove()
  .then(result => {
    res.json({ message: 'delete success' });
  })
  .catch(error => {
    res.json({ error });
  });
};
