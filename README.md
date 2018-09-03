# Node vs Ruby
Comparisons of memory usage and speed of common tasks using Node and Ruby.

## 1. CSV Parsing / Reading

Inside `csv_parse` folder

Ruby adapted from https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby


### Generate 1,000,000 line CSV (~75MB)

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

---

### Run Comparisons

These scripts should not load the entire test file (~75MB) into memory, rather they should stream the contents. You should be able to run them on any CSV regardless of file size or hardware restraints.

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

```$ node node_parse_fast_csv.js```
```bash
Sum:  499999500000
Time:  4.978s
Memory: 14.7 MB
```

```$ node node_parse_csv_streamify.js```
```bash
Sum:  499999500000
Time:  10.921s
Memory: 9.2 MB
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

```$ ruby ruby_parse.rb```
```bash
Sum: 499999500000
Time: 10.38s
Memory: 0.86 MB
```

<!-- **It's unclear why the Node implementations here use more memory. Note that the entire CSV (75MB) is not loaded into memory. The Ruby script appears more resilient in terms of disc streaming due to the very small size.** -->
