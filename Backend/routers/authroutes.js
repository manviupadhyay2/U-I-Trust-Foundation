const { register,login, volunteerregister} = require('../controllers/AuthController');
const { generateRandomData } = require('../controllers/dataentry');
const  {registeryy,perf , vol}  = require('../controllers/lcl');
const { listStudents } = require('../controllers/vol');
const router=require('express').Router();


router.post('/register',register);
router.post( '/login',login);
router.get("/", (req, res) => {
    console.log("get req");
    res.status(200);
    res.json({ message: "operational" });
});

// router.post( '/volregister',volunteerregister);

router.post("/data",generateRandomData);
router.post("/month", registeryy);
router.post("/perf", perf);
router.post("/vol", vol);
router.post("/stu", listStudents);
router.get("/", (req, res) => {
    console.log("get req");
    res.status(200);
    res.json({ message: "operational" });
});



module.exports=router;