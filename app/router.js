import { Router } from 'express';
import * as Announcement from './controllers/announcement_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here
router.route('/announcement')
  .post(Announcement.createAnn)
  .get(Announcement.getAnns)
  .delete(Announcement.deleteAnn);

export default router;
