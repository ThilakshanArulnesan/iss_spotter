/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
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


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("I didn't find the IP", error);
      return;
    } else {

      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          console.group("I didn't find the coords", error);
          return
        } else {
          fetchISSFLyOverTimes(coords, (error, times) => {

            if (error) {
              console.log("I couldn't get the flyover times ", error);
            } else {
              callback(null, times);
            }
          });


        }
      });

    }


  });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFLyOverTimes, nextISSTimesForMyLocation };
