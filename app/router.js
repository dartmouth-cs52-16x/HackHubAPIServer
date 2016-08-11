import { Router } from 'express';
import * as Announcement from './controllers/announcement_controller';
import * as Company from './controllers/company-controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
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
  .delete(Company.deleteComp);

export default router;
