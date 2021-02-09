const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.static('public'))
const Jimp = require('jimp')
const router = express.Router()

const images = {}

router.get('/api/:text', async (req, res) => {
  const text = req.params.text
  let { blur, src, black } = req.query
  
  if (!src) src = `https://placeimg.com/640/480/any?${Date.now()}`
  const image = images[src] ? images[src].image : await Jimp.read(src)

  images[src] = {image, 
               date: Date.now()}

  if (Object.keys(images).length == 11) {
      // delete first added image
      const oldest = Object.keys(images).sort( (a,b) => 
      images[b].date - images[a].date).pop()
      delete images[oldest]
  }

  if (blur > 0) image.blur(parseInt(blur))
  const font = await Jimp.loadFont(black ? Jimp.FONT_SANS_32_BLACK : Jimp.FONT_SANS_32_WHITE) 
  image
    .clone()
    .print(font, 10, 10, text)
    .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
    res.set('content-type', 'image/gif')
    res.send(buffer)
  })
})

module.exports = router