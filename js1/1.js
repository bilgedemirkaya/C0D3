/**
 * Write a function called solution that
 *   takes in a number and returns a function.
 * When the returned function is called, the next incremental number
 *   is returned
 * @param {number} num
 * @returns {function}
 */

const solution = (num) => {
  let i = 0
  return () => {
    i++
    return num + i
  }
}

module.exports = {
  solution
}
