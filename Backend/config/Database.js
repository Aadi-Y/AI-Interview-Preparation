const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{});
        console.log("Database connected Successfully");
    }
    catch(error){
        console.log("Error while connecting database : ",error.message);
        process.exit(1);
    }
}

module.exports = connectDatabase;