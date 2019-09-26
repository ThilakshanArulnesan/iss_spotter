const request = require(`request-promise-native`);

const API_KEY = "at_SPscTuZqaiZQieS3FWf4AGkLuBDNF";


const fetchMyIP = function() {
  return request(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}`);
};

const fetchMyCoordsByIP = function(ipObject) {
  let ip = JSON.parse(ipObject).ip;

  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFLyOverTimes = function(coordObj) {

  let { latitude, longitude } = JSON.parse(coordObj).data;

  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);

}

const nextISSTimesForMyLocation = function() {

  return fetchMyIP()
    .then(fetchMyCoordsByIP)
    .then(fetchISSFLyOverTimes)
    .then(body => {
      const { response } = JSON.parse(body);
      return response;
    }); //Returns  a PROMISE!!



};


module.exports = { nextISSTimesForMyLocation };
