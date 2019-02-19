const axios = require('axios');
const express = require('express');

const app = express();
const port = 4000;

let apiKey = process.env.WEATHER_API;
let cityID = '6174041';

async function getWeather() {
    // Default temp is set to Kelvin, so you have to add the conversion to metric
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${apiKey}`;
    let weather;

    const response = await axios.get(apiUrl);
    return response;
}

app.get("/", (req, res) => {
  getWeather()
    .then(weather => { console.log(weather.data); })
    .catch(error => { console.log(error) });
});

const server = app.listen(port);
