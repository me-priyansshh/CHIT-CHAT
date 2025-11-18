import mongoose from 'mongoose';
import colors from 'colors';

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
       console.log("Connected to MongoDB".rainbow.bold);
    })
    .catch(err => {
         console.log(err);
    })
}

export default connectDB;