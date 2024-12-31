/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if(str1.length != str2.length) return false;

  const track = {};

  for(let i = 0 ; i < str1.length ; i ++){
    const char1 = str1.charAt(i).toLowerCase();
    const char2 = str2.charAt(i).toLowerCase();

    if(!(char1 in track)){
      track[char1] = 0;
    }
    if(!(char2 in track)){
      track[char2] = 0;
    }

    track[char1] ++;
    track[char2] --;
  }

  for(let key in track){
    if(track[key] != 0){
      return false;
    }
  }
  return true;
}

module.exports = isAnagram;


