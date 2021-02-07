const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public'));
const Jimp = require('jimp');

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

app.get('/memegen/api/:text', async (req, res) => {
  const text = req.params.text
  let { blur, src, black } = req.query
  
  if (!src) src = 'https://placeimg.com/640/480/any'

  let meme
  Jimp.read(src).then( (image) => {
          meme = image
          blur ? image.blur( parseInt(blur) ) : ''
          const font = Jimp.loadFont(
            black ? Jimp.FONT_SANS_32_BLACK : Jimp.FONT_SANS_32_WHITE) 
          return font
          })
      .then( (font) => {
          meme.print(font, 10, 10, text).write('img.jpg') // save
          meme.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
            res.set('content-type', 'image/gif')
            res.set('cache-control', 'max-age=120')
            res.send(buffer)
          })
      })
    .catch(err => console.error(err))
})

module.exports = router
