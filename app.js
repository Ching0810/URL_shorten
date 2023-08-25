const express = require('express')
const { engine } = require('express-handlebars')
// import express from 'express'
// import { engine } from 'express-handlebars'
// app is a function
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');
app.use(express.static('public'))
// 要用middleware解析結果
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  // req & res are both object, therefore we could use method through .
  res.redirect('/url_shorten')
})

function random () {
  arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  let str = ''
  for (let i = 0; i < 5; i++) {
    str += arr[Math.floor(Math.random() * 62)].toString()
  }
  return str
}

app.get('/url_shorten', (req, res) => {
  res.render('index')
})

app.post('/url_shorten_result', (req, res) => {
  // Handle the POST request here
  const submittedUrl = req.body.URLsubmit;
  // Perform any required logic (e.g., generating a short URL)
  const shortUrl = random();
  // Respond to the client with the generated short URL
  res.render('result', {input_URL: submittedUrl, shorten: shortUrl})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})