const Amadeus = require('amadeus');
const dotenv = require('dotenv');
dotenv.config();

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET,
});

module.exports = amadeus;