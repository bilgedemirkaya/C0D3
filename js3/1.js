/**
 * given arr of strings (keys) and an object, return an array of values.
 * @param {array} arr {object} obj
 * @returns {array} arr
 */
// with recursion
const solution = (arr, obj, i=0, newArr=[]) => {
  let keys = Object.keys(obj)
  if (i > keys.length) {
    return newArr
  }
  if (keys.includes(arr[i])) {
    newArr.push(obj[arr[i]])
  }
  return solution(arr,obj, i+1, newArr)
}

module.exports = {
  solution
}
