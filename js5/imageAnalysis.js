const express = require('express');
const path = require('path')
const router = express.Router()
 
const views = path.join(__dirname, 'views')
const Tesseract = require('tesseract.js')
const { v4: uuidv4 } = require('uuid')

var multer  = require('multer')
var upload = multer({ dest: 'js5/files/' })

const jobs = {} 

router.get('/', (req, res) => {
  res.sendFile(path.join(views, 'textextract.html'))
})

router.post('/files', upload.array('image', 10), (req, res, next) => {
  if (!req.files) 
    return res.status(400).send('Please choose files')
  next()
})

router.post('/files', (req, res, next) => {
  const files = req.files
  const id = uuidv4()
  files.forEach(file => { 
    const path = file.path
    Tesseract.recognize(
    path,
    'eng',
    { logger: m => {console.log(m.progress)}}
  ).then(({ data: { text } }) => {
    jobs[id] = text
    return res.status(202).send(`<a href="/imageAnalysis/files/job/${id}"> Check out the result </a>`) 
   })
})

})

router.get('/files/job/:id', (req, res) => {
  const fileId = req.params.id
  return res.send(`
    <div class="container">
    <h1> IMAGE TEXT </h1>
    <p> ${jobs[fileId]} </p>
  </div>`)
})

module.exports = router