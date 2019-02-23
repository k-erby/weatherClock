var protobuf = require('protocol-buffers')
var api = require('./parser');
var fs = require('fs');

// description - clear sky, overcast clouds
// main - clouds, Clear

module.exports = {
  formatProtobuf: formatProtobuf = async (weatherConfig) => {
    console.log("This is the object:")
    console.log(weatherConfig)

    // pass a proto file as a buffer/string or pass a parsed protobuf-schema object
    var messages = protobuf(fs.readFileSync('weather.proto'))

    var buf = messages.WeatherMessage.encode({
      main: convertMain(weatherConfig.main),
      temp: convertTemp(weatherConfig.temp),
      cloudPercentage: convertClouds(weatherConfig.cloudPercentage),
      rainAmount: convertRain(weatherConfig.main, weatherConfig.rainAmount)
    })

    console.log("This is the encoded protobuf:")
    console.log(buf) // should print a buffer
    var obj = messages.WeatherMessage.decode(buf)
    console.log("This is the decoded protobuf:")
    console.log(obj) // should print an object
    return obj;
  }
}


/* ----------------------------------------------------------
            Config to LED Pattern Conversions

Rain amount doesn't need to be converted - 0 if there's no
rain over a 3h period, otherwise change rate of rain pattern.
---------------------------------------------------------- */

/*
Main weather pattern determines which LED pattern to choose, ie:
    clouds : gentle sway of LEDs
    clear  : bright/no pattern
    rain   : drizzle effect
    snow   : zigzag slow drizzle

TODO: would this be better to convert to an int?
*/
function convertMain(main) {
  switch (main) {
    case 'Clouds':
      main = 'clouds';
      break;
    case 'Clear':
      main = 'clear';
      break;
    case 'Rain':
      main = 'rain';
      break;
    case 'Snow':
      main = 'snow';
    }
    return main;
}

/*
Temp determines which color the LEDs should display, ie:
    0 : blue
    1 : light sky blue
    2 : yellow
    3 : yellow-orange
    4 : orange
    5 : red

TODO: change to actual color codes for easy processing later
*/
function convertTemp(temp) {
  switch (true) {
    case (temp < 0):
      temp = 0;
      break;
    case (temp >= 0 && temp < 5):
      temp = 1;
      break;
    case (temp >= 5 && temp < 10):
      temp = 2;
      break;
    case (temp >= 10 && temp < 15):
      temp = 3;
      break;
    case (temp >= 15 && temp < 20):
      temp = 4;
      break;
    case (temp >= 20):
      temp = 5;
  }
  return temp;
}

/*
Cloud percentage is used for brightness of LEDs. Because the LEDs are blinding
and there's no outer plate yet to dim the physically, halve the brightness.
*/
function convertClouds(clouds) {
  brightness = 100 - clouds;
  return brightness/2;
}

/*
Main doesn't get converted to lower case yet, so check for uppercase version.
*/
function convertRain(main, rain) {
  // Currently not raining & there's recorded rain : don't display pattern
  if ((main != 'Rain') && (rain != 0)) {
     rain = 0;
  }
  // Currently raining & no recorded rain : display pattern
  else if ((main == 'Rain') && (rain == 0)) {
    rain = 1;
  }
  // Currently raining & recorded rain : display faster pattern
  else if ((main == 'Rain') && (rain != 0)) {
    rain = 2;
  }
  return main, rain;
}
