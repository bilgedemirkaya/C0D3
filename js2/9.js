/**
 * Replicate Array.prototype.reduce and call it cReduce
 * Documentation:
 *     Replicate Array.prototype.reduce and call it cReduce
 */

const solution = () => {
  Array.prototype.cReduce = function (cb,init,i=0) {
    if (i >= this.length) {
      return init
    }
    if (init === undefined) {
      init = this[i++]
    }
    init = cb(init,this[i],i,this)
    return this.cReduce(cb,init,i+1)
    }
}

module.exports = {
  solution
}
