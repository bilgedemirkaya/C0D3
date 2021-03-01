const express = require('express')
const router = express.Router()

var path = require('path')

const views = path.join(__dirname, 'views')

const usersObject = {users: []}
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const { v4: uuidv4 } = require('uuid')


router.get('/', (req, res) => {
  res.sendFile(path.join(views, 'auth.html'))
})
 
//  create a new user
router.post('/api/users', (req, res, next) => {
  const { name, username, password, email } = req.body

  // check values are ok
  const passwordstr = Buffer.from(password, 'base64').toString()

  if (passwordstr.length < 5 ) 
    res.status(400).json({error: 'Password should be at least 5 characters.'})
  if (!username.match(/\w+$/)) 
    return res.status(400).json({error: 'Username must be alphanumeric'})
  if (!email.match(/^\S+@\S+$/))
    return res.status(400).json({error: 'Invalid email'})


  let isUsernameUnique = true
  let isEmailUnique = true

  usersObject['users'].map( (user) => {
    if(user['username'] === username) isUsernameUnique = false
    if(user['email'] === email) isEmailUnique = false
  })

  if (!isUsernameUnique) 
    return res.status(400).json({error: 'Username taken'})
  if (!isEmailUnique)
    return res.status(400).json({error: 'Email taken'})
  
  // hash password
  const hash = bcrypt.hashSync(password, saltRounds)

  const data = {
    id : uuidv4(),
    name,
    username,
    email,
    hash
  }

  data["jwt"]= jwt.sign({ userId: data.id }, 'secret code', { expiresIn: '1800s' })

  usersObject['users'].push(data) 
  res.json(data)
})

// get users list
router.get('/api/users', (req, res) => {
  res.json(usersObject)
})

// create a new session
router.post('/api', async (req, res) => {
  const {username, password} = req.body
  let user
  usersObject['users'].map( u => {
   if (u['username'] === username) // there is a user with that username
      user = u 
  })
  if(!user) 
    return res.status(400).json({ error: 'There is no account with that username.' })

 const match =  await bcrypt.compare(password, user.hash)
 if (!match) 
      return res.status(400).json({ error: 'Invalid password.' })

  return res.json({ jwt: user.jwt })
})
  

// get the currently logged in user. 
// You must accept a json web token in the header field.
router.get('/api', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const user = jwt.decode(token)
  if (!user) res.json({error: 'not authorized'})
  else res.json({jwt: token})
})

module.exports = router