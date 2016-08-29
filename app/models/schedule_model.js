// model for schedule

import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const ScheduleSchema = new Schema({
  day1: {
    day_of_week: String,
    month: String,
    day: String,
    range: {
      start: Number,
      end: Number,
    },
    events: [{
      time_range: String,
      name: String,
      location: String,
      color: String,
      start: Number,
      end: Number,
    }],
  },
  day2: {
    day_of_week: String,
    month: String,
    day: String,
    range: {
      start: Number,
      end: Number,
    },
    events: [{
      time_range: String,
      name: String,
      location: String,
      color: String,
      start: Number,
      end: Number,
    }],
  },
});

// create model class
const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

export default ScheduleModel;
