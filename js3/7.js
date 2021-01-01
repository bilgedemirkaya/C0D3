/*
 * write a map function for objects
 * @param {callback} cb
 * @returns {number}
*/

const solution = () => {
  Object.prototype.map = function (cb, i=0, newArr =[]) {
    const keys = Object.keys(this)
    const values = Object.values(this)
    if (i >= keys.length) {
      return newArr
    }
    newArr.push(cb(keys[i],values[i],i))
    return this.map(cb,i+1,newArr)
  }
}

module.exports = {
  solution
}
