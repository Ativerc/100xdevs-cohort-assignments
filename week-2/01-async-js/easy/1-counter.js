/*
## Create a counter in JavaScript

We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
It should go up as time goes by in intervals of 1 second

*/

let timerVal = 0;
function timer() {
  console.log(timerVal);
  timerVal++;
}

setInterval(timer, 1000);