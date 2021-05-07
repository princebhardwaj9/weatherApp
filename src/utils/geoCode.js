const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaXByaW5jZTA3IiwiYSI6ImNrbmZuOGFzMjA4eGwyb3AwMzdyeTZpMHoifQ.GJ7PeSdzWeU-wZ9KcIRGjQ&limit=1`;
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to Geo Location services!', undefined);
        } else if (
            (response && response.body && response.body.message) ||
            (response && response.body && response.body.features && (response.body.features).length == 0)
        ) {
            let error_message = response.body.message ? response.body.message : `Unable to find location. Try another search.`;
            callback(error_message, undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;