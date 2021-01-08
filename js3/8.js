/*
 * Write a function that takes in an object and a number (millieseconds).
 * - You must call each function value of the object {"nVal": (k) => {...}}
 * - {"nVal": (k) => {...When this function runs, k is "nVal"...}}
 * @param {object} obj
 * @param {number} num (millieseconds)
 * @call each function value of the object, millieseconds after each other
*/

const solution = (obj, num ,keys=Object.keys(obj),i=0) => {
  if ( i >= keys.length ) return 0
  obj[keys[i]](keys[i])
  setTimeout(() => {
    solution(obj,num,keys,i+1)
    },num)
}

module.exports = {
  solution
}
