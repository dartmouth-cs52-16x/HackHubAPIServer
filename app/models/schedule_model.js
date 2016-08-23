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
    events: Array,
  },
  day2: {
    day_of_week: String,
    month: String,
    day: String,
    range: {
      start: Number,
      end: Number,
    },
    events: Array,
  },
});

// create model class
const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

export default ScheduleModel;
