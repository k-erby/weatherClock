const express = require('express');
var api = require('./src/api');

const app = express();
const port = process.env.now ? 8080 : 4000;

app.get("/", (req, res) => {
  api.getCurrentLocalWeather().then(weatherData => {
    res.send(weatherData);
  })
});

const server = app.listen(port);