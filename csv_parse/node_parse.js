var fs = require('fs');
var csv = require('fast-csv');

const before = Date.now();

var stream = fs.createReadStream('data.csv');
var sum = 0;

csv
  .fromStream(stream, {headers : true})
  .on('data', data => sum += parseInt(data['id']))
  .on('end', () => {
    console.log('Sum: ', sum);
    console.log('Time: ', (Date.now() - before) / 1000 );
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory: ${Math.round(used * 100) / 100} MB`);
  });
