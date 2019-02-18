// Part of the zeit-script to get it running
module.exports = (req, res) => {
	  res.end(`Basic weather clock server stuff`);
}

const request = require('request');

// Grab apiKey from bash/zsh
let apiKey = process.env.WEATHER_API;
let cityID = '6174041';

// Default temp is set to Kelvin, so you have to add the conversion to metric
let url = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${apiKey}`;

request(url, function (err, response, body) {
  if (err) {
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It is ${weather.main.temp} degrees in ${weather.name}!`;

    console.log(message);
  }
});
