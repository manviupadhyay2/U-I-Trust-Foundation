const {Auth,Student, Mentor} = require('../db/schema');
const bcrypt = require('bcryptjs');
const {generateToken,verifyToken} = require('../middlewares/AuthToken');

const register =async (req, res) => {
        try {
            let user = req.body;
            console.log(user);
            // Check if user already exists
            let existsuser = await
            Auth.findOne({email:user.email});
            console.log(existsuser);
            if (existsuser) {
                return res
                    .status(400)
                    .json({msg: 'Student already exists'});
            }
            // Create new user
            let newuser;
            if (user.role === 'student') {
                newuser = new Student(user);
            } else if (user.role === 'mentor') {
                 newuser = new Mentor(user);
            } else if (user.role === 'academics') {
                 newuser = new Academics(user);
            }
            let auth= new Auth({email:user.email,password:user.password,role:user.role});
            console.log(newuser.email);
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword= await bcrypt.hash(user.password, salt);
            auth.password = encryptedPassword;
            newuser.password = encryptedPassword;
            // Save newuser
            await auth.save();
            await newuser.save();
            // Create JWT;
            const token=await generateToken(newuser);
            res
            .status(200).json({token,role:user.role});
        } catch (err) {
            console.error(err.message);
            res
                .status(500)
                .send('Server Error');
        }
    }

const volunteerregister =async (req, res) => {
    try {
        let user = req.body;
        console.log(user);
        // Check if user already exists
        let existsuser = await
        Auth.findOne({email:user.email});
        console.log(existsuser);
        if (existsuser) {
            return res
                .status(400)
                .json({msg: 'Volunteer already exists'});
        }
        // Create new user
        const newuser = new Mentor(user);
        let auth= new Auth({email:user.email,password:user.password,role:user.role});
        console.log(newuser.email);
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword= await bcrypt.hash(user.password, salt);
        auth.password = encryptedPassword;
        newuser.password = encryptedPassword;
        // Save newuser
        await auth.save();
        await newuser.save();
        // Create JWT;
        const token=await generateToken(newuser);
        res
        .status(200).json({token});
    } catch (err) {
        console.error(err.message);
        res
            .status(500)
            .send('Server Error');
    }
}


const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        // Check if user exists
        console.log(email,password);
        let user = await
        Auth.findOne({email});
        if (!user){
            return res
                .status(400)
                .json({msg: 'Invalid Credentials'});
        }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({msg: 'Invalid Credentials'});
        }
        // Create JWT
        const token=await generateToken(user);
        res
        .status(200).json({token,role:user.role});
    }   
    catch (err) {
        console.error(err.message);
        res
            .status(500)
            .send('Server Error');
    }
}


module.exports={register,login,volunteerregister};
