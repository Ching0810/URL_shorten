const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const myFunction = require('./public/javascripts/myFunction')
let originData

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
// 要用middleware解析結果
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.redirect('/url_shorten')
})

app.get('/url_shorten', (req, res) => {
  res.render('index')
})

app.post('/url_shorten_result', (req, res) => {
  // Handle the POST request here
  const clientSubmittedUrl = req.body.URLsubmit
  originData = myFunction.readData('./public/jsons/data.json')
  let fullUrl = ''
  if (!Object.values(originData).some((url) => url === clientSubmittedUrl)) {
    const shortUrl = myFunction.createShortUrl()
    myFunction.storeData(shortUrl, clientSubmittedUrl)
    fullUrl = `${req.headers.origin}/${shortUrl}`
    res.render('result', {fullUrl})
  } else {
    fullUrl = `${req.headers.origin}/${myFunction.getKeyByValue(originData, clientSubmittedUrl)}`
    res.render('result', {fullUrl})
  }
})

app.get('/:id', (req, res) => {
  const key = req.params.id
  originData = myFunction.readData('./public/jsons/data.json')
  if (originData.hasOwnProperty(key)) {
    const url = originData[key]
    return res.redirect(url)
  }
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})