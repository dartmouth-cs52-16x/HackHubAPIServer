import Company from '../models/company_model';


const cleanID = (input) => {
  return { id: input._id, name: input.name, image: input.image,
    website: input.website, recruiter: input.recruiter, jobs: input.jobs, about: input.about };
};

const cleanIDs = (inputs) => {
  return inputs.map(input => {
    return cleanID(input);
  });
};

export const createComp = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(401).send('You are not authorized for this action');
  }

  const company = new Company();
  company.name = req.body.name;
  company.image = req.body.image;
  company.website = req.body.website;
  company.recruiter = req.body.recruiter;
  company.jobs = [];
  company.about = '';
  company.save()
  .then(result => {
    res.json({ message: 'Company created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getCompanies = (req, res) => {
  Company.find().sort({ name: 1 })
  .then(results => {
    res.json(cleanIDs(results));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getCompany = (req, res) => {
  Company.findById(req.params.id)
  .then(result => {
    res.json(cleanID(result));
  })
  .catch(error => {
    res.json('error');
  });
};

export const deleteComp = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(401).send('You are not authorized for this action');
  }

  res.json({ message: `Company successfully deleted: id: ${req.params.id}` });
  Company.findById(req.params.id).remove()
  .then(result => {
    res.json({ message: `Company successfully deleted: id: ${req.params.id}` });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updateComp = (req, res) => {
  if (req.user.role !== 'organizer' && req.user.company !== req.body.name) {
    return res.status(401).send('You are not authorized for this action');
  }
  Company.findById(req.params.id)
  .then(result => {
    const updatedComp = result;
    updatedComp.name = req.body.name;
    updatedComp.image = req.body.image;
    updatedComp.website = req.body.website;
    updatedComp.recruiter = req.body.recruiter;
    updatedComp.jobs = req.body.jobs;
    updatedComp.about = req.body.about;
    updatedComp.save();
    res.json(cleanID(updatedComp));
  })
  .catch(error => {
    res.json({ error });
  });
};
