const noteFile = './notes'
let notes = []
fs.readFile(noteFile, (err, data) => {
  if (err) {
    return console.log('error reading file')
  }
  const str = data.toString()
  if (str) {
    notes = JSON.parse(str)
  }
})
router.get('/notes', (req, res) => {
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

router.get('/notes/add', (req, res) => {
  const content = req.query.content
  if (!content) {
    return res.status(400).send('Please provide a content query parameter')
  }
  notes.unshift(content)
  notes = notes.splice(0, 5)
  fs.writeFile(noteFile, JSON.stringify(notes), () => {})
  res.json(notes)
})