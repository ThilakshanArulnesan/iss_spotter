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

    callback(error, JSON.parse(body).ip);
  });
};

module.exports = { fetchMyIP };
