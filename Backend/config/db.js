import mongoose from 'mongoose';
import colors from 'colors';

function connectDB() {
    mongoose.connect(process.env.MONGO_URI_WHATSAPP)
    .then(() => {
       console.log("Connected to MongoDB".rainbow);
    })
    .catch(err => {
         console.log(err);
    })
}

export default connectDB;