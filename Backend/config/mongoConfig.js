const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
console.log(process.env.key);
const mongoUri=process.env.key;



const connectMongo=()=>{
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
}

module.exports=connectMongo;