/*
Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
clock that shows you the current machine time?

Can you make it so that it updates every second, and shows time in the following formats - 

 - HH:MM::SS (Eg. 13:45:23)

 - HH:MM::SS AM/PM (Eg 01:45:23 PM)
*/

function zeroPadding(timeValue) {
  timeValue = timeValue < 10 ? '0'+timeValue : timeValue;
  return timeValue;
}

function getTimeString(date, type) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  // Hour Correction
  let twelveHours = hours % 12; // For Hours above 12
  twelveHours = twelveHours ? twelveHours : 12; // For '0' Hour 
  // Hours, Minutes, Second Zero Padding
  

  if (type == 12) {
    let twelveHourString = `${zeroPadding(twelveHours)}:${zeroPadding(minutes)}:${zeroPadding(seconds)} ${ampm}`;
    return twelveHourString;
  }
  return `${zeroPadding(hours)}:${zeroPadding(minutes)}:${zeroPadding(seconds)}`
}

function timer() {
  let d = new Date();
  console.log(`24Hour Time - ${getTimeString(d)} 12Hour Time - ${getTimeString(d, 12)}`);
}

setInterval(timer, 1000);