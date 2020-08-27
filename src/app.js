const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { query } = require('express');
// Importing geocode code from geocode.js
const geocode = require('./utils/geocode');

// Importing forecast code from forecast.js
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config:
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location:
//app.set('views', path.join(__dirname, '../views'));
app.set('views', path.join(__dirname, viewsPath));
app.set('views', viewsPath);
app.set('view engine', 'hbs');

// Registering partials:
hbs.registerPartials(partialsPath);

// Setup static directory to serve:
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Sandra Nikolic'
	})
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Sandra Nikolic'
	})
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Get Help',
		helpText: 'This is some helpful text!'
	})
});

// Setting up route for not found help page:
//app.get('/help/*', (req, res) => {
//	res.send('This help article does not exist!')
//});

// Setting up generic 404 page, using * to match every url that doesn't exist:
//app.get('*', (req, res) => {
//	res.send('404 Page')
//});

// Setup testing endpoint, example products:
app.get('/products', (req, res) => {
	console.log(req.query);

	if(!req.query.search) {
		return res.send({
			error: 'You must provide a search term!'
		});
	}

	res.send({
		products: []
	});
});

app.get('/weather', (req, res) => {
	if(!req.query.address) {
		return res.send({
			error: 'You must provide a address!'
		});
	}

	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if(error) {
			return res.send({ error })
		}
	
		forecast(latitude, longitude, (error, forecastData) => {
			if(error) {
				return res.send({ error })
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		});
	});

	/*res.send({
		address: req.query.address
	});*/
});

app.get('/help/*', (req, res) => {
	res.render('no-help', {
		errorMessage: 'This help article does not exist!'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		errorMessage: '404 Page'
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000')
});