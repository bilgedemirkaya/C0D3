const lastseen = {}
router.get('/online', (req, res) => {
  const name = req.query.name
  if (!name) {
    return res.status(401).send('Please set a query params with name as the key and your name as the value')
  }
  lastseen[name] = Date.now()
  res.send(`
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/andybrewer/mvp/mvp.css" />
  <main>
  <h1>Welcome ${name}</h1>
  <p>Open this page in another tab, use a different name!</p>
  <div class="container"></div>
  </main>
  <script>
  const container = document.querySelector('.container')
  const render = (data) => {
    console.log('data is', data)
    const otherUserString = data.reduce((acc, name) => {
      return acc + '<h1>' + name + '</h1>'
    }, '')
    if (otherUserString) {
      container.innerHTML = '<h2>Other Users</h2>' + otherUserString
    }
  }
  const getData = () => {
    fetch('./users?name=${name}').then(r => r.json()).then(data => {
      console.log('data is', data)
      render(data)
      setTimeout(() => {
        getData()
      }, 1000)
    })
  }
  getData()
  </script>
  `)
})

router.get('/users', (req, res) => {
  const authorName = req.query.name
  const now = Date.now()
  lastseen[authorName] = now // update the user that sent the request
  Object.keys(lastseen).forEach(name => {
    if (lastseen[name] < now - 1000 * 10) {
      // if last seen is > 10 seconds, remove
      delete lastseen[name]
    }
  })
  const online = Object.keys(lastseen).filter(name => {
    return name !== authorName
  })
  res.json(online)
})