const express = require('express');
const fetch = require("node-fetch");

const app = express();
const port = 4000;

// TODO: this will result in 'undefined' when deployed, so fix that.
let apiKey = process.env.WEATHER_API;
let cityID = '6174041';

async function getWeather() {
    // Default temp is set to Kelvin, so you have to add the conversion to metric
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${apiKey}`;
    let weather;

    const response = await fetch(apiUrl);
    return response.json();
}

// TODO: zeit is still unhappy with this and throws a 502.
app.get("/", (req, res) => {
  getWeather().then(weather => {
    res.json(weather);
  });
});

//app.get("/", (req, res) => {
//  getWeather()
//    .then(weather => { console.log(weather); })
//    .catch(error => { console.log("Butts") });
//});

const server = app.listen(port);
