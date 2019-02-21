const express = require('express');
var parser = require('./src/parser');

const app = express();
const port = process.env.now ? 8080 : 4000;

app.get("/", (req, res) => {
  parser.getWeather().then(weatherConfig => {
    res.send(weatherConfig);
  })
});

const server = app.listen(port);