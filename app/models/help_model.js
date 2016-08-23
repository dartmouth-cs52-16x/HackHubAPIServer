import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const HelpSchema = new Schema({
  message: String,
  category: String,
  id: String,
});

// create model class
const HelpModel = mongoose.model('Help', HelpSchema);

export default HelpModel;
