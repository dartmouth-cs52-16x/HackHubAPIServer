import { Router } from 'express';
import * as Announcement from './controllers/announcement_controller';
import * as Company from './controllers/company_controller';
import * as Users from './controllers/user_controller';
import * as Help from './controllers/help_controller';
import * as Schedule from './controllers/schedule_controller';
import { requireSignin } from './services/passport';

const router = Router();

router.post('/signin', requireSignin, Users.signin);
router.post('/signup', Users.signup);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our hackhub api!' });
});

// /your routes will go here
router.route('/announcements')
  .post(Announcement.createAnn)
  .get(Announcement.getAnns)
  .delete(Announcement.deleteAnn);

router.route('/announcements/:id')
  .delete(Announcement.deleteAnn);

router.route('/company')
  .post(Company.createComp)
  .get(Company.getCompanies);

router.route('/company/:id')
  .get(Company.getCompany)
  .delete(Company.deleteComp)
  .put(Company.updateComp);

router.route('/users/:id')
      .get(Users.getProfile)
      .delete(Users.deleteUser)
      .put(Users.updateUser);

router.route('/users')
  .get(Users.getUsers);

router.route('/help')
  .post(Help.createHelp)
  .get(Help.getHelp);

router.route('/help/:id')
  .delete(Help.deleteHelp);

router.route('/schedule/:id')
      .put(Schedule.updateSched);

router.route('/schedule')
      .post(Schedule.createSched)
      .get(Schedule.getSchedule);

export default router;
