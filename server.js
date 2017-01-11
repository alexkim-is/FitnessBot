const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/welcome', (req, res) => {
  res.send('Hello, welcome to our server')
})

app.listen(3000, () => {console.log('Listening on port 3000')})
