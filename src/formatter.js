var protobuf = require('protocol-buffers')
var api = require('./parser');
var fs = require('fs');

// description - clear sky, overcast clouds
// main - clouds, Clear

let weatherConfig;

module.exports = {
  formatProtobuf: formatProtobuf = async (something) => {
    console.log("This is the object:")
    console.log(something)

    // pass a proto file as a buffer/string or pass a parsed protobuf-schema object
    var messages = protobuf(fs.readFileSync('weather.proto'))

    var buf = messages.WeatherMessage.encode({
      main: something.main,
      temp: something.temp,
      humidity: something.humidity,
      cloudPercentage: something.cloudPercentage,
      rainAmount: something.rainAmount
    })

    console.log("This is the encoded protobuf:")
    console.log(buf) // should print a buffer
    var obj = messages.WeatherMessage.decode(buf)
    console.log("This is the decoded protobuf:")
    console.log(obj) // should print an object
    return obj;
  }
}
