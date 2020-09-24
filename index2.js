
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOver, nextPasses } = require('./iss_promised');
const request = require('request-promise-native');



fetchMyIP().then((val) => {
  return fetchMyIP(val);
}).then((val) => {
  return fetchCoordsByIP(val);
}).then((val) => {
  return fetchISSFlyOver(val);
}).then((val) => {
  return nextPasses(val);
}).catch((error) => {
  console.log(`It didn't work!!! ${error.message}`);
});







