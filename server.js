const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.post('/db', function (req, res) {
  console.log(req.body)
  res.json(req.body)
})

app.listen(3000, () => {console.log('Listening on port 3000')})
