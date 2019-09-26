const { fetchMyIP, fetchCoordsByIP, fetchISSFLyOverTimes } = require(`./iss`);


fetchMyIP(
  (error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log('It worked! Returned IP:', ip);
  }
);
/*
fetchCoordsByIP("66.207.199.230", (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
  } else {
    // console.log(`It worked! Location is lat: ${data.latitude}, long: ${data.longitude}`);
    console.log(data);
  }

});
*/

let testC = {
  latitude: 43.64,
  longitude: -79.0,
};


fetchISSFLyOverTimes(testC, (error, val) => {
  if (error) {
    console.log("It didn't work!", error);
  } else {
    // console.log(`It worked! Location is lat: ${data.latitude}, long: ${data.longitude}`);
    console.log(val);
  }
});
