const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.static('public'))
const path = require('path')
const views = path.join(__dirname, 'views')
const filesPath = path.join(__dirname, 'files')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const fiveMin = 5 * 60 * 1000 /* ms */
const files = {}

app.get('/', (req, res) => {
  fs.readdir(`${__dirname}/public`, (err, files) => {
    res.send( files.reduce((acc, f) => {
      return acc + `
      <div>
        <a href="/${f}" target="__blank">${f}</a>
      </div>
      `
    }, ''))
  })
})

async function getAll() {
  // get all files and display in DOM
  fs.readdir(filesPath, (err, data) => {
    if (err) throw err
    data.forEach( (filename) => {
      fs.readFile(`${filesPath}/${filename}`, 'utf8', (err, content) => {
        if (err) throw err
        files[filename] = {date : Date.now(), content} // initialize the files object
      })
    })
 })
  
 app.get('/files', (req, res) => {
    res.sendFile(path.join(views, 'editor.html'))
  })
  
  // to create a file
  app.post('/api/files', (req, res, next) => {
    const {name, content} = req.body
    const filename = name + '.html'
    fs.writeFile(`${filesPath}/${filename}`, content, () => {}) // write the file
    files[filename] = {date : Date.now(), content} // store datetimes and content 
    res.send('ok')
  })
  
  // to get the an array containing all the files
  app.get('/api/files', (req, res) => {
   return fs.readdir(filesPath, (err, data) => {
      if (err) console.log(err)
      res.json(data)
    })
  })
  
  // to get the content of file-name
  app.get('/api/files/:name', (req, res) => {
    const filename = req.params.name
    return res.json(files[filename])
  })
  
  function deleteOldFiles () {
    const now = Date.now()
    if (!Object.keys(files)) return
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
    // check for old file every 5 minutes
    setInterval(deleteOldFiles, fiveMin)
  }
  getAll()

app.listen(process.env.PORT || 8123)
