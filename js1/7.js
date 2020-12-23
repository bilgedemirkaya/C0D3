/**
 * Write a function called solution that
 *   takes in 2 parameters, a string and a letter,
 *   returns true if the letter exist in the string,
 *   false otherwise
 * @param {string} inp
 * @param {string} letter
 * @returns {boolean}
 */

const solution = (inp, letter, i = 0) => {
  let found = false
  if (inp[i] === letter) {
    found = true 
  }
  else if (inp[i] !== letter && i < inp.length) {
    found = solution(inp,letter,i+1)
  }
  return found
}

module.exports = {
  solution
}
