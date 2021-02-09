const express = require('express')
const app = express()
const fs = require('fs')
const router = express.Router()

const path = require('path')
const views = path.join(__dirname, 'views')
const filesPath = path.join(__dirname, 'files')

const fiveMin = 5 * 60 * 1000 /* ms */
const files = {}

  // get all files from file directory
  fs.readdir(filesPath, (err, data) => {
    if (err) console.log(err)
    data.forEach( (filename) => {
      fs.readFile(`${filesPath}/${filename}`, 'utf8', (err, content) => { // get its content
        if (err) console.log(err)
        files[filename] = {date : Date.now(), content} // initialize the files object
      })
    })
  })

  // home page
  router.get('/', (req, res) => {
      res.sendFile(path.join(views, 'editor.html'))
  })

  // listen to create a file
  router.post('/api', (req, res, next) => {
    const {name, content} = req.body
    const filename = name + '.html'
    fs.writeFile(`${filesPath}/${filename}`, content, () => {}) // write the file
    files[filename] = {date : Date.now(), content} // store datetimes and content 
    res.send('ok')
  })

  // api containing all the files
  router.get('/api', (req, res) => {
  return fs.readdir(filesPath, (err, data) => {
      if (err) console.log(err)
      res.json(data)
    })
  })

  // to get the content of file-name
  router.get('/api/:name', (req, res) => {
    const filename = req.params.name
    return res.json(files[filename])
  })

  function deleteOldFiles () {
    const now = Date.now()
    if (Object.keys(files).length == 0) return
    Object.keys(files).map( (filename) => {
          if (files[filename].date <= now - fiveMin) {
            // delete the file
            fs.unlink(`${filesPath}/${filename}`, function (err) {
              if (err) throw err
              console.log('File deleted!')
          })
        }
    })
  }

  // check for old files every 5 minutes
  setInterval(deleteOldFiles, fiveMin)

module.exports = router