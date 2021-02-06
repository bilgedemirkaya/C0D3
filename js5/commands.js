const express = require('express')
const app = express()
const router = express.Router()
const { execFile } = require('child_process')

function renderPage() {
return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Command</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<style>
body {
font: 1.3rem Inconsolata, monospace;
text-shadow: 0 0 5px #C8C8C8;
}
.command {
cursor: pointer;
}
.jumbotron {
background-color: black;
background-image: radial-gradient(
rgba(0, 150, 0, 0.75), black 120%
);
}
p,h1 {
color:white;
}
.inpt {
border:none;
outline: none;
width:80%;
vertical-align:center;
}
</style>
</head>
<body>
<div class="container">
<div class="jumbotron">
<h1>Terminal</h1>
<p>For the security of our server, only a few commands are allowed. Try some of these:</p>
<p class="command">ls</p>
<p class="command">pwd</p>
<p class="command">ls -la</p>
<p class="command">cat app.js</p>
<input class="inpt" type="text">
</div>
<hr>
<div class="output"></div>
</div>
<script>
const input = document.querySelector('.inpt')
const output = document.querySelector('.output')
const commands = document.querySelectorAll('.command')

function sendtoServer(val) {
fetch('/commands', { // post a request to server
method: 'POST',
headers: {
"content-type": "application/json"
},
body: JSON.stringify({
command: val
}),
})
.then(res => res.json()) // get the result back
.then( (json) => output.innerText = json.data) // put it into DOM
}

function checkCommand (val) {
const command = val.split(' ')[0]
if (command === 'ls' || command === 'pwd' || command === 'cat')
sendtoServer(val)
else
alert('allowed commands are: ls, pwd, cat')
}

input.addEventListener('keyup', (e) => {
if (e.key === 'Enter') {
const val = input.value
checkCommand(val)
input.value = ''
}
})

commands.forEach( (command) => {
command.addEventListener('click', (e) => {
sendtoServer(e.target.innerText)
})
})

</script>
</body>
</html>
`
}

router.get('/', (req, res) => {
const page = renderPage()
res.send(page)
})

router.post('/', (req,res, next) => { // Get the request and send back a response
const args = req.body.command.split(' ')
const command = args.shift() // get the first command
return execFile(command, args, (error, stdout, stderr) => {
return error ? res.json({ data: 'Unvalid command' }) : res.json({ data: stderr || stdout })
})
})

module.exports = router