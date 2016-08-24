import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const CompanySchema = new Schema({
  name: String,
  image: String,
  website: String,
  recruiter: String,
  jobs: Array,
  about: String,
});

// create model class
const CompanyModel = mongoose.model('Company', CompanySchema);

export default CompanyModel;
