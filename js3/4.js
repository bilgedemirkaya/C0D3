/*
 * 2sum: write a function that takes in an array of numbers and a number, and returns true if any pairs add up to the number.
 * (The numbers in the array is not unique, meaning there may be duplicate numbers)
 * @param {array} arr
 * @param {number} num
 * @returns {boolean}
 */

const solution = (arr, num,i=0,hashmap = {}) => {
  const val = arr[i]
  if ( i >= arr.length ) {
    return false
  }
  if (hashmap[num - val]) { 
   return hashmap[num - val]
  }
  hashmap[val] = true   
  return solution(arr, num, i+1, hashmap)
}

module.exports = {
  solution
}
