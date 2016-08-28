import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const AnnouncementSchema = new Schema({
  text: String,
  date: String,
  hacker: Boolean,
  recruiter: Boolean,
}, {
  timestamps: true,
});

// create model class
const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema);

export default AnnouncementModel;
