import { Router } from 'express';
import * as Announcement from './controllers/announcement_controller';
import * as Company from './controllers/company_controller';
import * as Users from './controllers/user_controller';
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
      .delete(Users.deleteUser);

router.route('/users')
  .get(Users.getUsers);


export default router;
