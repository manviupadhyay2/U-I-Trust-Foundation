const { login } = require('../controllers/AuthController');
const {Volunteer, Student}=require('../db/schema');
const router=require('express').Router();
const mapping=require('../middlewares/mapping');


router.get("/mapnow",async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        const students = await Student.find().populate('sessionHistory').exec();// Only select name and description fields
        console.log(volunteers[0]);
        console.log(volunteers,students);
        mapping(volunteers,students);
        res();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});



module.exports=router;