const express = require('express') 

const app = express() // Use the express library to create an app

// Whenever a request comes in at the path `/hello`, you send back some HTML!
app.get('/hello', (req, res) => { 
    res.send("<h1> Hello world </h1>")
  })

app.delete('/hello', (req, res) => { 
    res.send("ok")
})

app.get('/set', (req, res) => {
  res.set({
    'set-cookie': 'name=bilgescookie' // For cookies, you must set a key / value pair
  })
  res.send("<h1> Cookie has been set </h1>")
})

app.get('/', (req, res) => {
  // You may notice that cookie is a long string of cookies
  // split by ;
  // You may need to parse out the cookie key / value to
  // get the correct value.
  res.send(`
    <h1>Welcome ${req.get('cookie')}</h1>
  `)
})

app.get('/ignore', (req, res) => {
  // This helps you see if your server actually recieved a request or not.
  console.log('ouch', Date.now())
  res.set('Cache-Control', 'max-age=120')
  setTimeout(() => {
    res.send('<h1>Cached page</h1>')
  }, 3000)
})

let visitorCount = 0
app.get('/count', async (req, res) => {
  visitorCount = visitorCount + 1
  return res.send(`
  <h1>Welcome, this page has been visited ${visitorCount} times</h1>
  `)
})

app.get('/delay', async (req, res) => {
  setTimeout(() => {
    return res.send(`
    <h1>Your request has been delayed by 5 seconds</h1>
  `)
  }, 5000)
})

let visitorId = 0
app.get('/ab', (req, res) => {
  const cookie = req.get('cookie') || ''
  const cookieStr = cookie.split(';').find(str => {
    return str.includes('abtest=')
  }) || ''
  
  let visitorKey = cookieStr.split('=')[1]
  if (!visitorKey) {
    visitorKey = visitorId
    visitorId = visitorId + 1
  }
  let color = '#2a2'
  if (+visitorKey % 3 === 0) { // happens 1 every 3 times
    color = '#a22'
  }
  res.set('set-cookie', `abtest=${visitorKey}`)
  res.send(`
  <style>
  h1 {
  color: ${color};
  }
  </style>
  <h1>Hello World</h1>
  `)
})


app.listen(3000) // Your app needs to listen to a port number.