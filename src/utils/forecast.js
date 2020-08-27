// Including postman request in our project:
const request = require('postman-request');

// Reusable forecast function:
const forecast = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=03259a18d4789ae1ebb7e676bfab177d&query=' + latitude + ',' + longitude;

	request({url, json: true}, (error, {body}) => {
		if(error) {
			callback("Unable to connect to weather service!", undefined)
		} else if(body.error) {
			callback("Unable to find location", undefined)
		} else {
			const data = body.current;
			callback(undefined, `Outside it is ${data.temperature} degrees, but it feels like ${data.feelslike} degree.`)
		}
	});
}

// Exporting forecast code:
module.exports = forecast;