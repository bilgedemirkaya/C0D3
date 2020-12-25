/**
 * Write a function called solution that
 *   Takes in 2 numbers and
 *   returns an array with the length equal to the first input number.
 *     Every element in the returned array is an array,
 *        with length equal to  the second input number.
 *     All values in the array is 0.
 * @param {number} row
 * @param {number} col
 * @returns {array}
 */

function makeSub (col,arr=[],i=0) {
  if (col <= i ) {
    return arr
  }
  arr.push(0) 
  return makeSub(col,arr,i+1)
}

const solution = (row, col,arr = [], e=0) => {
  if (row <= e) {
    return arr
  }
  const sub = makeSub(col)
  arr.push(sub)
  return solution(row, col,arr, e+1)
}

module.exports = {
  solution
}
