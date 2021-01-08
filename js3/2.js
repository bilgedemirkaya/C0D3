/**
 * takes in 2 integers, create 2d array of objects. First integer represents how many nested arrays within the array. Second integer represents how many objects within each array.
 * solution(4,2)
 * returns:
 * [
    [{x: 0, y: 0}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}],
    [{x: 0, y: 2}, {x: 1, y: 2}],
    [{x: 0, y: 3}, {x: 1, y: 3}],
  ]
 * @param {integer} num1 {integer} num2
 * @return {array} arr
 */

function makeSub(num2, counter, arr=[], i=0) {
  let newobj = {}
  if (i >= num2) {
    return arr
  }
  newobj['x'] = i
  newobj['y'] = counter
  arr.push(newobj)
  return makeSub(num2,counter,arr,i+1)
}
const solution = (num1, num2, i=0, newArr=[],counter=0) => {
  if (i >= num1) {
    return newArr
  }
  let b = (makeSub(num2,counter))

  newArr.push(b)
  return solution(num1, num2, i+1, newArr,counter+1)
}


module.exports = {
  solution
}
