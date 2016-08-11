import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const CompanySchema = new Schema({
  text: String,
  date: String,
});

// create model class
const CompanyModel = mongoose.model('Company', CompanySchema);

export default CompanyModel;
