const request = require('request');





const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    let myIP = JSON.parse(body);
    return callback(null, myIP.ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  let str = `https://ipvigilante.com/${ip}`;
  request(str, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const err = `Received status code ${response.statusCode} when fetching coords for ${ip}`;
      callback(Error(err), null);
      return;
    }
    // let coords = JSON.parse(body);
    // console.log(fetchCoordsByIP)
    // let lat = coords.latitude;
    // let long = coords.longitude;
    let latLong = {};
    latLong.lat = JSON.parse(body).data.latitude;
    latLong.long = JSON.parse(body).data.longitude;

    callback(null, latLong);
  });
};

const fetchISSFlyOver = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.long}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const err = `Received status code ${response.statusCode} when fetching ISS flyovers for ${coords}`;
      callback(Error(err), null);
      return;
    }
    
    let flyovers = JSON.parse(body).response;
    callback(null, flyovers);
  });
};

const nextTimesForMe = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log('it didnt work');
      return callback(error, null);
    }
    

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log(`failed to fetch latitude and longitude.\n${error}`);
        return callback(error, null);
      }
      
      fetchISSFlyOver(coords, (error, flyovers) => {
        if (error) {
         
          console.log(`failed to fetch next ISS flyovers.`);
          return callback(error, null);
        }
        callback(null, flyovers);
      });
      
    });
  });


};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOver, nextTimesForMe };