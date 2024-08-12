const mongoose = require('mongoose');
const { Schema } = mongoose;

const SeatSchema = new Schema({
    flightId: { type: Schema.Types.ObjectId, ref: Flight, required: true },
    seatNumber: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
}, { timestamps: true })

const Seat = mongoose.model("Seat", SeatSchema);
module.exports = Seat;