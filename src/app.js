const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/weather');

const app = express();

// Define path for express config.
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prince Bhardwaj'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Prince Bhardwaj'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Prince Bhardwaj',
        helpMessage: 'Some help text'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geoCode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, weatherResponse) => {
            if (error) {
                return res.send({
                    error
                });
            }
            return res.send({
                location,
                weatherResponse,
                address: req.query.address
            });
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prince Bhardwaj',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prince Bhardwaj',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});