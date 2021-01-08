const lib = {}

lib.tokenize = (str) => {
arr = str.toUpperCase().split(' ')
return arr.reduce((acc, val) => {
    if (val.length > 3 && !Number.isInteger(parseInt(val))) {
        acc[val] = 1
    }
    return acc
},{})
}

lib.makeTrainingData = (obj) => {
return Object.entries(obj).map((data) => {
   let res = {}
   res['input'] = lib.tokenize(data[0])
   res['output'] = lib.tokenize(data[1])
   return res
})
}

lib.pushAll = (data, arr) => {
    const vals = Object.values(data) 
    vals.map((val) => {
        if (Array.isArray(val) ) {
            val.push(arr)
        }
    })
    return data
}

fn.getMostLikely = (obj) => {
    return Object.entries(obj).reduce((ent, e) => {
      if (e[1] > ent[1]) {
        return e
      }
      return ent
    }, [null, 0])[0]
  }
  
module.exports = lib