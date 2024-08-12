const express = require('express');
const router = express.Router();
const amadeus = require('../utils/amadeus')
const Amadeus = require('amadeus');

//Route 1: City and Airport [Search: Origin and Destination], Login required: NO

router.get('/city-and-airport-search/:parameter', async(req, res) => {
    try {
        const parameter = req.params.parameter; // Request parameter
        const response = await amadeus.referenceData.locations.get({
            keyword: parameter,
            subType: Amadeus.location.any,
        });
        res.json(response.result); // Send the response back as JSON
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch city-and-airport search data" });
    }
});

//Route 2: serach flights between Origin and Destination, Login required: NO

router.get('/flight-search', async(req, res) => {
    try {
        const { originCode, destinationCode, dateOfDeparture, adults, numberOfChildern, travelClass } = req.body;

        if (!originCode || !destinationCode || !dateOfDeparture) {
            return res.status(400).json({
                error: "Please provide originCode, destinationCode, and dateOfDeparture"
            });
        }

        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate: dateOfDeparture,
            adults: adults,
            children: numberOfChildern,
            cabinClass: travelClass,
        });

        res.send(response.data);
    } catch (error) {
        console.error('Error fetching flight data:', error);
        res.status(500).json({ error: "Failed to Fetch `flight search API`" });
    }
});

//Route 3: Confirming a flight, Login required: No

router.post('/flight-confirmation', async(req, res) => {

    const flight = req.body.flight
    if (!flight) {
        return res.status(400).json({ error: "Flight data is required" });
    }

    // Confirm availability and price
    const response = await amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
            'data': {
                'type': 'flight-offers-pricing',
                'flightOffers': [flight],
            }
        })
    );
    res.send(response.data)
})

//determine if flight is domestic[TODO]

//Route 4: Once the flight is confirmed, Book flight
router.post('/flight-booking', async(req, res) => {
    try {
        const flight = req.body.flight;
        const name = req.body.name;

        if (!flight || !name) {
            return res.status(400).json({ error: "Flight data and traveler name are required" });
        }

        const response = await amadeus.booking.flightOrders.post(
            JSON.stringify({
                'data': {
                    'type': 'flight-order',
                    'flightOffers': [flight],
                    'travelers': [{
                        "id": "1",
                        "dateOfBirth": "1982-01-16",
                        "name": {
                            "firstName": name.first,
                            "lastName": name.last
                        },
                        "gender": "MALE",
                        "contact": {
                            "emailAddress": "jorge.gonzales833@telefonica.es",
                            "phones": [{
                                "deviceType": "MOBILE",
                                "countryCallingCode": "34",
                                "number": "480080076"
                            }]
                        },
                        "documents": [{
                            "documentType": "PASSPORT",
                            "birthPlace": "Madrid",
                            "issuanceLocation": "Madrid",
                            "issuanceDate": "2015-04-14",
                            "number": "00000000",
                            "expiryDate": "2025-04-14",
                            "issuanceCountry": "ES",
                            "validityCountry": "ES",
                            "nationality": "ES",
                            "holder": true
                        }]
                    }]
                }
            })
        );

        res.send(response.data);
    } catch (error) {
        console.error('Error booking flight:', error);
        res.status(500).json({ error: "Failed to book flight" });
    }
});

module.exports = router;