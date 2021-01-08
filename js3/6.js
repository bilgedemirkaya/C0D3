/*
 * write a function that takes in an array of numbers, and returns a new array of all duplicate numbers
 * @param {array} arr
 * @returns {array}
*/

const solution = (arr) => {
  let res = []
  arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1
    if (acc[val] == 2) 
      res.push(val)
    return acc
  }, {})
  return res
}

module.exports = {
  solution
}
