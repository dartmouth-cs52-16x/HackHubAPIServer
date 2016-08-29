// model for company

import mongoose, { Schema } from 'mongoose';

const CompanySchema = new Schema({
  name: String,
  image: String,
  website: String,
  recruiter: String,
  jobs: Array,
  about: String,
});

const CompanyModel = mongoose.model('Company', CompanySchema);

export default CompanyModel;
