const express        = require('express')
const bodyParser     = require('body-parser')
const methodOverride = require('method-override')
const pg             = require('pg')
const knex           = require('knex')({
  client: 'postgresql',
  connection: {
    user: 'Alex1',
    database: 'fitnessbot'
  }
})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))


//Store user data in database
app.post('/signup', function (req, res)  {
  knex('users')
    .insert({
      name: req.body.name,
      age: req.body.age,
      mobile: req.body.mobile,
      //.replace(/-/g, '')
      schedule: req.body.schedule
    })
    .returning('name')
    .then(() => res.send('Thank you for joining'))
})

//DELETE user data in database
app.delete('/unsub', function (req, res) {
  knex('users')
    .where('mobile', '=', req.body.mobile)
    .del()
    .then(() => res.send('See you again.'))
})


app.listen(3000, () => { console.log('Listening on port 3000')})
