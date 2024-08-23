const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectMongo = require('./config/mongoConfig');
const router=require('./routers/router');
const mapping = require('./middlewares/mapping');
dotenv.config(); 

const app = express();
app.use(express.static('public'));
app.use(express.json()); //parse json data


app.use(cors({
    origin: ['http://ec2-54-255-249-50.ap-southeast-1.compute.amazonaws.com:3001',"http://localhost:3001"], // replace 'http://localhost:5173' with the appropriate origin URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // include credentials
    allowedHeaders: 'Content-Type, Authorization', // include content type and authorization headers
}));

connectMongo();//connecting with db

app.use('/api',router);// main routing



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

