/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase();
  str = str.replace(/[^a-z0-9]/g, '');

  let start = 0;
  let end = str.length - 1;

  while (start < end) {    
    if (str[start] != str[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

// console.log(isPalindrome("Able, was I ere I saw Elba!"));

module.exports = isPalindrome;
