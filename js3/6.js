/*
 * write a function that takes in an array of numbers, and returns a new array of all duplicate numbers
 * @param {array} arr
 * @returns {array}
*/

const val = arr[i]
const keys = Object.keys(hashmap)

const solution = (arr, i=0, hashmap= {}) => {
  const val = arr[i]
  const keys = Object.keys(hashmap)
  
  if ( i >= arr.length ) {
    return keys.reduce((acc, key) => { 
      if (hashmap[key]) {
          acc.push(parseInt(key))
      }
      return acc
      },[])
  }
  hashmap.hasOwnProperty(val) ? hashmap[val] = true  : hashmap[val] = false
  return solution(arr, i+1, hashmap)
}

module.exports = {
  solution
}
