import Company from '../models/company_model';


const cleanID = (input) => {
  return { id: input._id, text: input.text, date: input.date };
};

const cleanIDs = (inputs) => {
  return inputs.map(input => {
    return cleanID(input);
  });
};

export const createComp = (req, res) => {
  const company = new Company();
  company.text = req.body.text;
  company.date = req.body.date;
  company.save()
  .then(result => {
    res.json({ message: 'Company created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getCompanies = (req, res) => {
  Company.find()
  .then(results => {
    res.json(cleanIDs(results));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deleteComp = (req, res) => {
  res.json({ message: `Company successfully deleted: id: ${req.params.id}` });
  Company.findById(req.params.id).remove()
  .then(result => {
    res.json({ message: `Company successfully deleted: id: ${req.params.id}` });
  })
  .catch(error => {
    res.json({ error });
  });
};
