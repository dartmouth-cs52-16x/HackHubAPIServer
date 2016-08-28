import { Router } from 'express';
import * as Announcement from './controllers/announcement_controller';
import * as Company from './controllers/company_controller';
import * as Users from './controllers/user_controller';
import * as Help from './controllers/help_controller';
import * as Schedule from './controllers/schedule_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.post('/signin', requireSignin, Users.signin);
router.post('/signup', Users.signup);

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our hackhub api!' });
});

// /your routes will go here
router.route('/announcements')
  .post(requireAuth, Announcement.createAnn)
  .get(requireAuth, Announcement.getAnns)
  .delete(requireAuth, Announcement.deleteAnn);

router.route('/announcements/:id')
  .delete(requireAuth, Announcement.deleteAnn);

router.route('/company')
  .post(requireAuth, Company.createComp)
  .get(Company.getCompanies);

router.route('/company/:id')
  .get(Company.getCompany)
  .delete(requireAuth, Company.deleteComp)
  .put(requireAuth, Company.updateComp);

router.route('/users/:id')
      .get(Users.getProfile)
      .delete(requireAuth, Users.deleteUser)
      .put(requireAuth, Users.updateUser);

router.route('/users')
  .get(Users.getUsers);

router.route('/help')
  .post(requireAuth, Help.createHelp)
  .get(requireAuth, Help.getHelp);

router.route('/help/:id')
  .delete(requireAuth, Help.deleteHelp);

router.route('/schedule/:id')
      .put(requireAuth, Schedule.updateSched);

router.route('/schedule')
      .post(requireAuth, Schedule.createSched)
      .get(Schedule.getSchedule);

export default router;
