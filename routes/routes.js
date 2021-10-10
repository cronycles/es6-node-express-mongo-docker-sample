import express from 'express';
const router  = express.Router(); 

import HomeController from '../controllers/home.controller.js'; 
import ApiController from '../controllers/api.controller.js'; 

const homeController = new HomeController();
const apiController = new ApiController();

router.get('/', homeController.index); 
router.post('/carriera/lead-web-developer', apiController.saveCandidateData); 
 
export default router;