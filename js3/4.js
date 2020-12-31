/*
 * 2sum: write a function that takes in an array of numbers and a number, and returns true if any pairs add up to the number.
 * (The numbers in the array is not unique, meaning there may be duplicate numbers)
 * @param {array} arr
 * @param {number} num
 * @returns {boolean}
 */

const solution = (arr, num, i=0) => {
  if ( i >= arr.length ) {
    return false
  }
  arr.splice(i,1)
  if (arr.includes(num - arr[i])) {
      return true
  }
  return solution(arr, num, i+1)
}

module.exports = {
  solution
}
