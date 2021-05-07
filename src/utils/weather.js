const request = require('request');

const weather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4bd1f1c9e64ca138992ecafd6087f0cb&query=${latitude},${longitude}`;
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather services.', undefined);
        } else if (response && response.body && response.body.error) {
            callback(response.body.error.info, undefined);
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + `. It is currently ` + response.body.current.temperature + ` degrees out. It feels like ` + response.body.current.feelslike + ` degrees out. There is a ` + response.body.current.precip + `% chance of rain.`);
        }
    });
};

module.exports = weather;