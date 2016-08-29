// controller for schedule

import Schedule from '../models/schedule_model';


const cleanID = (input) => {
  return {
    id: input._id,
    day1: {
      day_of_week: input.day1.day_of_week,
      month: input.day1.month,
      day: input.day1.day,
      range: {
        start: input.day1.range.start,
        end: input.day1.range.end,
      },
      events: input.day1.events,
    },
    day2: {
      day_of_week: input.day2.day_of_week,
      month: input.day2.month,
      day: input.day2.day,
      range: {
        start: input.day2.range.start,
        end: input.day2.range.end,
      },
      events: input.day2.events,
    },
  };
};

const cleanIDs = (inputs) => {
  return inputs.map(input => {
    return cleanID(input);
  });
};

export const createSched = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(401).send('You are not authorized for this action');
  }
  Schedule.collection.remove();
  console.log(Schedule);
  const schedule = new Schedule();
  schedule.day1.day_of_week = req.body.day1.day_of_week;
  schedule.day1.month = req.body.day1.month;
  schedule.day1.day = req.body.day1.day;
  schedule.day1.range.start = req.body.day1.range.start;
  schedule.day1.range.end = req.body.day1.range.end;
  schedule.day1.events = req.body.day1.events;

  schedule.day2.day_of_week = req.body.day2.day_of_week;
  schedule.day2.month = req.body.day2.month;
  schedule.day2.day = req.body.day2.day;
  schedule.day2.range.start = req.body.day2.range.start;
  schedule.day2.range.end = req.body.day2.range.end;
  schedule.day2.events = req.body.day2.events;

  schedule.save()
  .then(result => {
    res.json({ message: 'Schedule created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getSchedule = (req, res) => {
  Schedule.find()
  .then(results => {
    console.log(results);
    res.json(cleanIDs(results));
  })
  .catch(error => {
    res.json({ error });
  });
};


export const updateSched = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(401).send('You are not authorized for this action');
  }
  Schedule.findById(req.params.id)
  .then(result => {
    const schedule = result;
    if (req.body.day1.day_of_week !== '') { schedule.day1.day_of_week = req.body.day1.day_of_week; }
    if (req.body.day1.month !== '') { schedule.day1.month = req.body.day1.month; }
    if (req.body.day1.day !== '') { schedule.day1.day = req.body.day1.day; }
    if (req.body.day1.range.start !== '') { schedule.day1.range.start = req.body.day1.range.start; }
    if (req.body.day1.range.end !== '') { schedule.day1.range.end = req.body.day1.range.end; }
    schedule.day1.events = req.body.day1.events;

    if (req.body.day2.day_of_week !== '') { schedule.day2.day_of_week = req.body.day2.day_of_week; }
    if (req.body.day2.month !== '') { schedule.day2.month = req.body.day2.month; }
    if (req.body.day2.day !== '') { schedule.day2.day = req.body.day2.day; }
    if (req.body.day2.range.start !== '') { schedule.day2.range.start = req.body.day2.range.start; }
    if (req.body.day2.range.end !== '') { schedule.day2.range.end = req.body.day2.range.end; }
    schedule.day2.events = req.body.day2.events;

    schedule.save();
    res.json(cleanID(schedule));
  })
  .catch(error => {
    res.json({ error });
  });
};
