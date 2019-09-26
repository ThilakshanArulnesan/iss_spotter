const { nextISSTimesForMyLocation } = require(`./iss_promised`);
/*
fetchMyIP().then(fetch
  body => {
    let ip = JSON.parse(body).ip;
    console.log("Got the IP: " + ip);
  }
).then(
  ip => {
    return fetchMyCoordsByIP(ip)
  }
)
*/

nextISSTimesForMyLocation()
  .then(passTimes => {
    //console.log(passTimes);
    printIt(passTimes);
  })
  .catch(error => {
    console.log("It didn't work: " + error.message)
  });



const printIt = function(passTimes) {
  for (let obj of passTimes) {
    let date = new Date(obj.risetime * 1000).toLocaleString("en-US", { timeZone: "America/New_York" });
    console.log(`Next pass at ${date} for ${obj.duration} seconds`);
  }

}
