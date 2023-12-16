/*
## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```
*/

let fs = require('fs');

fs.readFile("file-cleaner.txt", "utf-8", function(err, data) {
  if (err){
    console.log(err);
  } else {
    const str = data;
    const words = str.split(/\s+/);
    const sentence = words.join(" ");
    fs.writeFile("file-cleaner.txt", sentence,"utf-8", function(err) {
      if (err) {
        console.log("File write errors!:");
        console.log(err);
      } else {
        console.log("File written successfully!")
        console.log(sentence)
      }
  })
}})
