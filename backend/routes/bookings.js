const express = require('express')
const router = express.Router();
const axios = require('axios');
const getAccessToken = require('../utils/getAccessToken');

//Unified API endpoint for booking: (flight, hotels)

router.post('/bookings', async(req, res) => {
    const { type, details } = req.body;
    try {
        let response;
        switch (type) {
            case 'flight':
                response = await bookFlight(details);
                break;
            case 'hotel':
                response = await bookHotel(details);
                break;
            default:
                return res.status(400).json({ error: 'Invalid Booking Type' });
        }
        res.json(response.data);

    } catch (error) {
        console.error('error booking data: ', error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Filed to process Booking" });
    }
});

// Book Flight 

const bookFlight = async(details) => {
    const accessToken = await getAccessToken();
    return axios.post('https://test.api.amadeus.com/v2/shopping/flight-offers', details, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        }
    });
}