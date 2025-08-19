const mongoose = require("mongoose");

let isConnected = false;
const connectDatabase = async () => {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {});

        isConnected = db.connections[0].readyState === 1;

        if (isConnected) {
            console.log("Database connected Successfully");
        }
    }
    catch (error) {
        console.log("Error while connecting database : ", error.message);
        process.exit(1);
    }
}

module.exports = connectDatabase;