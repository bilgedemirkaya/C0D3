const allFuns = {}

allFuns.sumAll = (arr) => {
  if (arr.length == 0 ) return 0 
  return arr.reduce((acc, val) => {
    return acc + val
  })
}

module.exports = allFuns