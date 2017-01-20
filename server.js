const express        = require('express')
const bodyParser     = require('body-parser')
const pg             = require('pg')
const client         = require('twilio')(process.env.accountSid, process.env.authToken)
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
app.use(express.static('public'))


//Store user data in database
app.post('/signup', function (req, res)  {
  knex('users')
    .insert({
      name: req.body.name,
      age: req.body.age,
      mobile: req.body.mobile.replace(/-/g, ''),
      schedule: req.body.schedule
    })
    .then(() => res.send('Thank you for joining'))
})


//DELETE user data in database
app.delete('/unsub', function (req, res) {
  knex('users')
    .where('mobile', '=', req.body.mobile)
    .del()
    .then(() => res.send('See you again.'))
})


//TIME CALCULATOR variable and functions
var today = new Date()
var hours = today.getHours()
var minutes = today.getMinutes()
var hourNow = `${hours}`
var minuteNow = `${minutes}`

function filterByHour(item) {
  var scheduleHour = item.schedule.slice(0, 2)
  var scheduleMinute = item.schedule.slice(3,5)
  if (hourNow == scheduleHour && minuteNow < scheduleMinute) {
    return item
  }
  if (hourNow == scheduleHour-1 && scheduleMinute < 15) {
    return item
  }
}

// /Get data from database every 15 seconds.
// var intervalOne = setInterval(getData, 15000)
function getData() {
  var result = knex('users')
    .returning('name', 'mobile', 'schedule')
    .then((data) => data.filter(filterByHour))
    .then((data) => data.map(sendText))
    .catch((error) => console.error(error))
  return result
}


//Send out text via Twilio
function sendText(data) {
    client.messages.create({
      to: `+1${data.mobile}`,
      from: '+17072101123',
      body: `Hi there, ${data.name}. Your workout session is coming up. Are you ready to dominate?`
    })
}


app.listen(3000, () => console.log('Listening on port 3000'))
