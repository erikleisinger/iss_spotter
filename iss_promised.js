const request = require('request-promise-native');





const fetchMyIP = function () {
  return new Promise((resolve, reject) => {
    request('https://api.ipify.org?format=json', (error, response, body) => {
      let myIP = JSON.parse(body);
      console.log(myIP.ip);
      resolve(myIP.ip);
    });
  });

};

const fetchCoordsByIP = function (ip) {
  return new Promise((resolve, reject) => {
    let str = `https://ipvigilante.com/${ip}`;
    request(str, (error, response, body) => {
      let latLong = {};
      latLong.lat = JSON.parse(body).data.latitude;
      latLong.long = JSON.parse(body).data.longitude;
      console.log(latLong);
      resolve(latLong)
    });
  });
};

const fetchISSFlyOver = function (coords) {
  return new Promise((resolve, reject) => {
    request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.long}`, (error, response, body) => {
      let flyovers = JSON.parse(body).response;
      console.log(flyovers);
      resolve(flyovers);
    });
  })
};


    const nextPasses = function(passTimes) {
      return new Promise((resolve, reject) => {
        for (let item of passTimes) {
          let risetime = item.risetime;
          let date = new Date(risetime * 1000).toString();
          let duration = item.duration;
          console.log(`Next pass on ${date} for ${duration} seconds.`);
        }
      })
      
    };



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOver, nextPasses };