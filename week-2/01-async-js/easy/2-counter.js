/* ## Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.
*/

let timerValue = 0

function counter() {
  console.log(timerValue);
  timerValue++;
  setTimeout(counter, 1000);
}

counter()































































// (Hint: setTimeout)