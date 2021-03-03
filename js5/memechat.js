const express = require('express')
const router = express.Router()
const fs = require('fs')

const Jimp = require('jimp')

const path = require('path')
const views = path.join(__dirname, 'views')
const filesPath =  path.join(__dirname, 'files')

const files = {}

router.get('/', (req,res) => {
  res.sendFile(path.join(views, 'memechat.html') )
})

// accept the username & set the cookie
router.post('/', (req, res) => {
  const {username} = req.body
  res.set('set-cookie', `username=${username}`) 
  res.status(202).redirect('/memechat/room')
})

// render the memechat room
router.get('/room', (req, res) => {
  res.sendFile(path.join(views, 'meme-room.html'))
})

// accept the taken image and msg
router.post('/room', async (req, res) => {  
  const {img, msg, username} = req.body
  const imageData = Buffer.from(img, 'base64')

  // make it a meme
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE) 
  Jimp.read(imageData)
  .then( (image) => {
    return image
    .print(font, 10, 10, msg)
    .resize(400,450)
    .write(`routes/files/${username}.png`) // save
  })
  .catch(err => console.log(err))
  // set the files object
  files[username] = `${username}.png`

  return res.status(202).send('ok')
})

// get previous meme chat
router.get('/api/messages', (req, res) => {
  fs.readdir(filesPath, (err, data) => {
    if (err) console.log(err)
    data.forEach( (filename) => {
        const username = filename.split('.')[0]
        files[username] = filename
        })
  })
  res.status(202).json(files)
})

 // show the image from files
router.get('/files/:filename' , (req,res) => {
  const filename = req.params.filename
  res.sendFile(path.join(filesPath, filename))
})

module.exports = router