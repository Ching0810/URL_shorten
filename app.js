const express = require('express')
// app is a function
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // req & res are both object, therefore we could use method through .
  res.send('express app for URL_shorten')
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})