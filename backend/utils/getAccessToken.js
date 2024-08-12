const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const getAccessToken = async() => {
    try {
        const response = await axios.post(process.env.oauth2_URI,
            new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': process.env.AMADEUS_API_KEY,
                'client_secret': process.env.AMADEUS_API_SECRET
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        throw new Error('Could not retrieve access token');
    }
};

module.exports = getAccessToken;