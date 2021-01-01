/*
 * Given object of key: string values and an object of key: function values, call the functions in 2nd object, using the values in 1st object as function params
 * @param {object} obj1
 * @param {object} obj2
 * @return {object}
 **/

const solution = (obj1, obj2) => {
  const keys = Object.keys(obj1)

  return keys.reduce((acc,key) => {
    obj2.hasOwnProperty(key) ? acc[key] = obj2[key](obj1[key]) : acc[key] = obj1[key] 
    return acc
  },{})
}

module.exports = {
  solution
}
