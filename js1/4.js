/**
 * Write a function called solution that
 *   takes in a function.
 * The input function will be called with increasing
 *    numbers starting from 0 until the input function
 *    returns false
 * @param {function} fun
 * @returns null
 */

const solution = (fun, i = 0) => {
  let f = fun(i)
  if (f !== false) {
    solution(fun,i + 1)
  }
  return 0
}

module.exports = {
  solution
}
