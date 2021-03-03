const express = require('express')
const router = express.Router()
 
var path = require('path')

const views = path.join(__dirname, 'views')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const { v4: uuidv4 } = require('uuid')

const usersById = {}
const usersByUsername = {}
const usersByEmail = {}

router.get('/', (req, res) => {
  res.sendFile(path.join(views, 'auth.html'))
})
 
//  create a new user
router.post('/api/users', (req, res, next) => {
  const { name, username, password, email } = req.body

  // check values are ok
  const passwordstr = Buffer.from(password, 'base64').toString()

  if (passwordstr.length < 5 ) 
    return res.status(400).json({error: 'Password should be at least 5 characters.'})
  if (!username.match(/\w+$/)) 
    return res.status(400).json({error: 'Username must be alphanumeric'})
  if (!email.match(/^\S+@\S+$/))
    return res.status(400).json({error: 'Invalid email'})

  if (usersByUsername[username]) 
    return res.status(400).json({error: 'Username taken'})
  if (usersByEmail[email])
    return res.status(400).json({error: 'Email taken'})
  
  // hash password
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) console.log(err)
    const data = {
      id : uuidv4(),
      name,
      username,
      email,
      hash
    }
    
  data["jwt"]= jwt.sign({ userId: data.id }, 'secret code', { expiresIn: '1800s' })

  usersById[data.id] = data
  usersByUsername[data.username] = data
  usersByEmail[data.email] = data

  res.status(202).send({jwt: data.jwt})
  })
})
  

// get the currently logged in user. 
// You must accept a json web token in the header field.
router.get('/api', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  user = jwt.decode(token)
  if (user === null) res.status(403).json({error: 'not authorized'})
  else res.status(202).json({jwt: token})
})

// create a new session
router.post('/api', async (req, res) => {
  const {username, password} = req.body
  const user = usersByUsername[username]
  if(!user)
    return res.status(400).json({ error: 'There is no account with that username.' })

 const match = await bcrypt.compare(password, user.hash)
 if (!match) 
      return res.status(400).json({ error: 'Invalid password.' }) 

  return res.json({ jwt: user.jwt })
})

module.exports = router
