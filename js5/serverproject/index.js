const express = require('express')
const fs = require('fs')

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
  const num = req.query.time
  console.log(num)
  setTimeout(() => {
    return res.send(`
    <h1>Your request has been delayed by ${num} seconds</h1>
  `)
  }, num)
})

app.get('/messages', async (req, res) => {
  const arr = []
  const body = req.body
  console.log(body) 
  res.send('<div class="container"><input> </input> <button> Submit </button></div><script></script>')
})


app.get('/delay/:num', async (req, res) => {
  const num = req.params.num
  setTimeout(() => {
    return res.send(`<h1>Your request has been delayed by ${num} seconds</h1>`)
  }, num * 1000 )
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


const noteFile = './notes'
let notes = []
fs.readFile(noteFile, (err, data) => {
  if (err) {
    return console.log(err)
  }
  const str = data.toString()
  if (str) {
   notes = JSON.parse(str)
  }
})
app.get('/notes', (req, res) => {
  const noteListString = notes.reduce((acc, note) => {
    return acc + `
    <h3>${note}</h3>
    `
  }, '')
  res.send(`
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andybrewer/mvp/mvp.css" />
  <main>
  ${noteListString}
  <hr />
  <textarea class="noteInput" name="" cols="30" rows="10"></textarea>
  <button class="noteSubmit">Submit</button>
  <script>
  const textarea = document.querySelector('.noteInput')
  const submit = document.querySelector('.noteSubmit')
  submit.addEventListener('click', () => {
    const value = textarea.value
    fetch('./notes/add?content=' + value)
    textarea.value = ''
    alert('submitted. Refreshing the page to see your message')
    window.location.reload()
  })
  </script>
  `)
})

app.get('/notes/add', (req, res) => {
  const content = req.query.content
  if (!content) {
    return res.status(400).send('Please provide a content query parameter')
  }
  notes.unshift(content)
  notes = notes.splice(0, 5)
  fs.writeFile(noteFile, JSON.stringify(notes), () => {})
  res.json(notes)
})
app.listen(3000) // Your app needs to listen to a port number.