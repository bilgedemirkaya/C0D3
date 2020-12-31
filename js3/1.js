/**
 * given arr of strings (keys) and an object, return an array of values.
 * @param {array} arr {object} obj
 * @returns {array} arr
 */
// with recursion
const solution = (arr, obj) => {
  return arr.reduce( (acc, key) => {
       if (obj.hasOwnProperty(key)) {
         acc.push(obj[key])
      }
      return acc
      }, []);
}

module.exports = {
  solution
}
