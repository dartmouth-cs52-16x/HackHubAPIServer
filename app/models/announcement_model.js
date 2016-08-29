// model for announcements

import mongoose, { Schema } from 'mongoose';

const AnnouncementSchema = new Schema({
  text: String,
  date: String,
  hacker: Boolean,
  recruiter: Boolean,
}, {
  timestamps: true,
});

const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema);

export default AnnouncementModel;
