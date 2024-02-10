const http = require("http");
const url = require("url");
const fs = require("fs").promises

async function temperature(city) {
  try {
    // console.log(city);
    let cityFile = await fs.readFile("cities.json", "utf-8");
    let cities = JSON.parse(cityFile);

    const cityCord = cities.find(
      (cityName) => cityName.name.toLowerCase() == city.toLowerCase()
    );

    // console.log(cityCord);
    const { lat, lng } = cityCord;
    // console.log(lat + " " + lng);
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );

    // console.log(response)
    const data = await response.json();
    //   console.log(data)
      return data["current_weather"].temperature;
    
  } catch (err) {
    console.error(err.message);
  }
  // return data["current_weather"].temperature;
}
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (path === "/weather") {
    // Handle the '/users' endpoint
    const city = query.city;
      // console.log(city);
      if (city && city != undefined) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        //   res.end(`Weather information for ${city}`);
          temperature(city).then((result) => { res.end(`Weather information for ${city}: ${result}`);})
      } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(`you need to insert the city name like this'http://localhost:3000/weather?city=NewYork'`);
    }
    
  } else {
    // Handle unknown endpoints
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
