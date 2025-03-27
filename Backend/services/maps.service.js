const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getCoordinates = async (address) => {
    if(!address){
        throw new Error('Address is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching coordinates');
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if(response.data.rows[0].elements[0].status === 'Zero_results'){
                throw new Error('No routes found');
            }
            const data = response.data.rows[0].elements[0];
            return data;
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    }catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input){
        throw new Error('Query is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching suggestions');
    }
};


module.exports.getCaptainInTheRadius = async (ltd,lng,radius) =>

    //radius in km
    {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [ [ltd,lng],radius/6371]
                }
            }
        });

        return captains;
}