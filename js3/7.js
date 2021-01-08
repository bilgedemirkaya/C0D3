/*
 * write a map function for objects
 * @param {callback} cb
 * @returns {number}
*/

const solution = () => {
  Object.prototype.map = function (cb) {
    return Object.entries(this).map(([key, value], i) => {
      return cb(key,value,i)
    })
  }
}

module.exports = {
  solution
}
