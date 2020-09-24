const { nextTimesForMe } = require('./iss');



const nextPasses = function(passTimes) {
  for (let item of passTimes) {
    let risetime = item.risetime;
    let date = new Date(risetime * 1000).toString();
    let duration = item.duration;
    console.log(`Next pass on ${date} for ${duration} seconds.`);
  }
};

nextTimesForMe((error, passTimes) => {
  if (error) {
    return console.log(`didnt work`);
  }
  nextPasses(passTimes);
});

