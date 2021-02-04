const express = require('express')
const app = express()
const fs = require('fs')
const fetch = require('node-fetch')

app.use(express.static('public'))

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

let user = {}
const htmlFile = './public/visitorsFile'

fs.readFile(htmlFile, 'utf8', (err, data) => {
  if (err) 
    console.log(err)
  if (data) {
    user = JSON.parse(data)
  }
})

app.get('/visitors' , (req,res) => {
  let ipAddress = req.get('x-forwarded-for') || req.connection.remoteAddress
    if (user[ipAddress] ) {
     // console.log(visitors)
      const page = getPage(user,ipAddress)   
      res.send(page)
    }
    else {
      fetch(`https://js5.c0d3.com/location/api/ip/${ipAddress}`).then(res => res.json())
      .then( (data) => {
          user[ipAddress] = data
          fs.writeFile(htmlFile, JSON.stringify(user), () => {})
          const page = getPage(user, ipAddress)
          res.send(page)
        })
    }
})

function getPage (user, ipAddress) {
  const visitorStr = Object.values(user).reduce((acc ,values) => {
    return acc + `<li> ${values.cityStr} - ${values.area} </li>`
  }, '')
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>IP Geolocation</title>
    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB29pGpCzE_JGIEMLu1SGIqwoIbc0sHFHo&callback=initMap"></script>
    <style>
    #map {
      height: 500px;
    }
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
    <div class="container">
        <div class="jumbotron">
        <h3> Hello! Looks like you are coming from somewhere around ${user[ipAddress].cityStr}</h3>
        </div>
        <div id="map"> </div>
    </div>
    <hr>
    <div class="container"> 
    <h1> The cities our visitors come from </h1>
    <div class="jumbotron visitors"> ${visitorStr}</div>
    </div>
    <script>
    let map;
    const coords = {
      lat: ${user[ipAddress].ll[0]}, 
      lng : ${user[ipAddress].ll[1]}
    }
     function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        center: coords,
        zoom: 10,
      });
      const marker = new google.maps.Marker({ position: coords, map: map })
      document.getElementById("map").append(marker)
    }
    </script>
</body>
</html>
`
}

app.get('/api/visitors', (req,res) => { 
  res.json(user)
})

app.listen(process.env.PORT || 8123);


module.exports = app