//const { fetchMyIP, fetchCoordsByIP, fetchISSFLyOverTimes } = require(`./iss`);

const { nextISSTimesForMyLocation } = require(`./iss`);

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work! Something went wrong.", error);
  }

  for (let obj of passTimes) {
    //console.log(obj.risetime);
    // console.log(new Date(obj.risetime));
    let date = new Date(obj.risetime * 1000).toLocaleString("en-US", { timeZone: "America/New_York" });
    console.log(`Next pass at ${date} for ${obj.duration} seconds`);
  }
  // success, print out the deets!
  //  console.log(passTimes);
});


/*
fetchMyIP(
  (error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log('It worked! Returned IP:', ip);
  }
);
*/
/*
fetchCoordsByIP("66.207.199.230", (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
  } else {
    // console.log(`It worked! Location is lat: ${ data.latitude }, long: ${ data.longitude }`);
    console.log(data);
  }

});
*/
/*
let testC = {
  latitude: 43.64,
  longitude: -79.0,
};


fetchISSFLyOverTimes(testC, (error, val) => {
  if (error) {
    console.log("It didn't work!", error);
  } else {
    // console.log(`It worked! Location is lat: ${ data.latitude }, long: ${ data.longitude }`);
    console.log(val);
  }
});
*/
