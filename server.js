const app            = require('express')()
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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.post('/signup', function (req, res) {
  knex('users')
    .insert({name: req.body.name, age: req.body.age, mobile: req.body.num})
    .returning('name')
    .then(() => res.sendStatus(201))
})

app.delete('/unsub', function (req, res) {
  knex('users')
    .where('mobile', '=', req.body.num)
    .del()
    .then(() => res.sendStatus(204))
})


app.listen(3000, () => { console.log('Listening on port 3000')})
