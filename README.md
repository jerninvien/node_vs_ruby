# Node vs Ruby
Comparisons of memory usage and speed of common tasks using Node and Ruby

Ruby adapted from https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby

### Generate 1,000,000 line csv file with filler text

```ruby
require 'csv'
require_relative './helpers'

headers = ['id', 'name', 'email', 'city', 'street', 'country']

name    = "Pink Panther"
email   = "pink.panther@example.com"
city    = "Pink City"
street  = "Pink Road"
country = "Pink Country"

print_memory_usage do
  print_time_spent do
    CSV.open('data.csv', 'w', write_headers: true, headers: headers) do |csv|
      1_000_000.times do |i|
        csv << [i, name, email, city, street, country]
      end
    end
  end
end
```

```$ ruby generate_csv.rb```
```bash
Time: 6.61
Memory: 1.12 MB
```


### Compare Node vs Ruby

```javascript
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
```

```$ node node_parse.js```
```bash
Sum:  499999500000
Time:  5.74s
Memory: 18.05 MB
```
---

```ruby
require_relative './helpers'
require 'csv'

print_memory_usage do
  print_time_spent do
    sum = 0

    CSV.foreach('data.csv', headers: true) do |row|
      sum += row['id'].to_i
    end

    puts "Sum: #{sum}"
  end
end
```

```$ ruby parse.rb```
```bash
Sum: 499999500000
Time: 11.88s
Memory: 0.57 MB
```
