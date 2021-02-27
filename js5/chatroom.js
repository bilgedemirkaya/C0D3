const express = require('express')
const router = express.Router()

var path = require('path')

const views = path.join(__dirname, 'views')
const fetch = require('node-fetch');

const chatroom = {}

  // middleware to get session
  router.use('/*', (req, res, next) => {
    const jwt = req.headers.authorization
      // send jwt to third party
      fetch('https://js5.c0d3.com/auth/api/session', {
        headers: {
          Authorization: jwt,
        },
      })
      .then((res) => res.json())
      .then((body) => {
        req.user = {body}
        next()
      })
  })

router.get('/:roomname?', (req, res) => {
  res.sendFile(path.join(views, 'chat.html'))
})

// sends back the user information
router.get('/api/session', ( req, res) => {
  const user = req.user.body
 // console.log(user)
  if (user.error) {
    return res.status(403).json({error: 'not authorized'})
  }
  res.json({user})
}) 

// Gets the messages in the room
router.get('/api/:room/messages', ( req, res) => {
  const room = req.params.room
  res.json(chatroom[room])
})

// Creates a new message in the room
router.post('/api/:room/messages', ( req, res, next) => {
  const room = req.params.room
  const text = req.body.text
  const name = req.user.body.username
 // console.log(req.user)
  chatroom[room] ? chatroom[room].push({text, name}) : chatroom[room] = [{text, name}]
 // console.log(chatroom)
  res.send('ok')
})

module.exports = router
