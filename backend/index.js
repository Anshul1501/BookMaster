const connectToMongo = require('./db');
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
dotenv.config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//define routes here
app.use("/api/auth", require("./routes/auth"));
app.use("/api/search", require("./routes/search"));

app.listen(port, () => {
    console.log(`Ticket Booking app is listing on the ${port}`);
})