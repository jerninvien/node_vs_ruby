var fs = require('fs');
var csv = require('csv-streamify');

const before = Date.now();
const parser = csv({objectMode: true, columns: true});

var sum = 0;

parser
  .on('data', data => sum += parseInt(data['id']))
  .on('end', () => {
    console.log('Sum: ', sum);
    console.log('Time: ', (Date.now() - before) / 1000 );
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory: ${Math.round(used * 100) / 100} MB`);
  });

fs.createReadStream('data.csv').pipe(parser);
