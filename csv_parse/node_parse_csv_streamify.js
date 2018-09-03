var fs = require('fs');
var csv = require('csv-streamify');

const memBefore = process.memoryUsage().heapUsed / 1024 / 1024;
const before = Date.now();

const parser = csv({columns: true});

var sum = 0;

parser
  .on('data', data => sum += parseInt(data['id']))
  .on('end', () => {
    console.log('Sum: ', sum);
    console.log('Time: ', (Date.now() - before) / 1000 );
    const memAfter = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory: ${Math.round((memAfter - memBefore) * 100) / 100} MB`);
  });

fs.createReadStream('data.csv').pipe(parser);
