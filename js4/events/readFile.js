const fs = require('fs')

const readfile = (file) => {
    return new Promise ( (resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) { 
                return reject(err)
              }
              resolve(data)
        })
    })
}

const readfiles = (arr) => {
    return Promise.all(arr.map(data => {
        return readfile(data)
    }))
}

readfiles( [
    "random.html",
    "promise.js", 
    "nxn.html"
  ] ).then( (data) => {
    console.log(data[0]) // file contents from lib.js
    console.log(data[1]) // file contents from lib.test.js
    console.log(data[2]) // file contents from ~/Documents/notes.txt
  })