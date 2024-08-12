const mongoose = require('mongoose');
const { schema } = mongoose;

const FlightSchema = new Schema({
    flightNumber: { type: String, required: true },
    airline: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    seatsAvailable: { type: Number, required: true },
}, { timestamps: true });

const Flight = mongoose.model("Flight", FlightSchema);
module.exports = Flight;