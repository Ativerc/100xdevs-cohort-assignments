/* ## Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.
*/

let fs = require('fs');

let data = "written from script";
fs.writeFile("a.txt", data,"utf-8", function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("File written successfully!");
    console.log("File contents:");
    fs.readFile("a.txt", "utf-8", function(err, data) {
      console.log(data);
    });
  }
});