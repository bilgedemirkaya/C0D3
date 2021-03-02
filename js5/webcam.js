const express = require('express')
const router = express.Router()
const fs = require('fs')

const { v4: uuidv4 } = require('uuid');
const path = require('path')
const views = path.join(__dirname, 'views')
const filesPath = path.join(__dirname, 'files')

const files = {}

router.get('/', (req, res) => {
    res.sendFile(path.join(views, 'webcam.html'))
})

router.post('/files', (req, res) => {
    const { img } = req.body
    const id = uuidv4()
    const imgName = `${id}.png`
    const imgPath = `routes/files/${imgName}`
    return fs.writeFile(imgPath, img, 'base64', (err) => {
      if (err) return res.status(500).json({ error: err })
      files[imgName] = img
      return res.status(201).json({url:imgPath, name:imgName})
    })
})
  
router.get('/files/:id' , (req,res) => {
    // show the image from files
    const id = req.params.id
    res.sendFile(path.join(filesPath, id))
})
  
module.exports = router