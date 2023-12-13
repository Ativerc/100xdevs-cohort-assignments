/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase().replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g, "");;
  let strArray = str.split("");
  let reversedStrArray = strArray.slice().reverse();
  console.log(str);
  let count = 0;
  for (let i = 0; i < reversedStrArray.length; i++) {
    if (reversedStrArray[i] != strArray[i]) {
      return false;
    }
  }
  return true;
}

// console.log(isPalindrome('tonnot'));

module.exports = isPalindrome;
