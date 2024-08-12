const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.mongoURI;

async function connectToMongo() {
    await mongoose.connect(mongoURI)
        .then(() => console.log("Mongoose connected successfully"))
        .catch(() => console.log("failed to connect Mongoose"))
}

module.exports = connectToMongo;