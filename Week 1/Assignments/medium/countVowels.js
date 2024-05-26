/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    let vowelsCount = 0;

    for(let i = 0 ; i < str.length ; i ++){
      const curr = str.charAt(i).toLowerCase();

      if(curr == 'a' || curr == 'e' || curr == 'u' || curr == 'i' || curr == 'o'){
        vowelsCount ++;
      }
    }
    return vowelsCount;
}

module.exports = countVowels;