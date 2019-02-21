# weatherClock


## Installation

You'll need `zeit Now` for the serverless NodeJS portion. Download the Now CLI via npm:

```bash
npm i -g now
now help        // test this command worked
now login       // login to the CLI
```

## Usage

To run this project, you'll need to grab an API key from OpenWeatherMaps. This uses 
the ['Current Weather' data API.](https://openweathermap.org/api)

You'll need to create a `.env` file at the root of this directory. Add your api key to it:
```text
open_weather_secret=API_KEY
```

For deployment, you'll need to add your api key to `now` as well. To do this:
```bash
now secret add open_weather_secret API_KEY
```
 
For local access at `localhost:4000` run:
```bash
npm run start
```

For deployment, run:
```bash
now -e open_weather_secret=@open_weather_secret
```

The project will be deployed and reachable at the specified url in the console.

## What was used

Axios, express, nodemon, zeit Now
