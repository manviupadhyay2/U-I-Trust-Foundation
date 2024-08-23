const router = require('express').Router();
const authroute=require('./authroutes');
const volunteerroute=require('./volunteerroutes');

const uploadController= require('../controllers/uploadController')
const map=require('./mappingroutes');


router.use('/auth',authroute);
router.use('/volunteer',volunteerroute);
router.use('/up',uploadController);
router.use('/map',map);



module.exports = router;