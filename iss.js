/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const API_KEY = "at_SPscTuZqaiZQieS3FWf4AGkLuBDNF";

const request = require(`request`);

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(error, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let myData = JSON.parse(body).data;

    let { latitude, longitude } = myData;//unpacks only latitude and longigute

    callback(null, { latitude, longitude });


  });
}

const fetchISSFLyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let myData = JSON.parse(body).response;
    // console.log(myData);
    // let { duration, risetime } = myData;//unpacks only latitude and longigute

    callback(null, myData);


  });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFLyOverTimes };
