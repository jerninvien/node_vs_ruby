# Node vs Ruby
Comparisons of memory usage and speed of common tasks using Node and Ruby

Ruby adapted from https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby

### Generate 1,000,000 line csv file with filler text

```$ ruby generate_csv.rb```
```bash
Time: 6.61
Memory: 1.12 MB
```


### Compare Node vs Ruby

```$ ruby parse.rb```
```bash
Sum: 499999500000
Time: 11.88
Memory: 0.57 MB
```

```$ node node_parse.js```
```bash
Sum:  499999500000
Time:  5.74
Memory: 18.05 MB
```
