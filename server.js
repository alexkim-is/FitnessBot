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

//Get data from database every 10 sec
var intervalOne = setInterval(getData, 8000)

function getData() {
  var result = knex.select('mobile').from('users')
    .then((item) => console.log(item))
      }
    }
}

//Store user data in database
app.post('/signup', function (req, res)  {
  knex('users')
    .insert({
      name: req.body.name,
      age: req.body.age,
      mobile: req.body.num.replace(/-/g, '')
    })
    .returning('name')
    .then(() => res.send('Thank you for joining'))
})

app.delete('/unsub', function (req, res) {
  knex('users')
    .where('mobile', '=', req.body.num)
    .del()
    .then(() => res.send('See you again.'))
})

app.listen(3000, () => { console.log('Listening on port 3000')})
