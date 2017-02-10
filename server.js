const express        = require('express')
const bodyParser     = require('body-parser')
const pg             = require('pg')
const client         = require('twilio')(process.env.accountSid, process.env.authToken)
//export accountSid=//

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
      schedule: req.body.schedule,
      status: 'active'
    })
    .then(() => res.send(`${req.body.name}, welcome to the club!`))
    .catch((err) => console.error(err))
})


//DELETE user data in database
app.post('/unsub', function (req, res) {
  knex('users')
    .where('mobile', '=', req.body.mobile)
    .update({status: 'inactive'})
    .then(() => res.send('See you again.'))
    .catch((err) => console.error(err))
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

// /Get data from database every 15 minutes(900000s=15min, )
// var intervalOne = setInterval(getData, 5000)

function getData() {
  var result = knex('users')
    .where('status', '=', 'active')
    .returning('name', 'mobile', 'schedule')
    .then((data) => data.filter(filterByHour))
    .then((data) => data.map(sendText))
    .catch((error) => console.error(error))
  return result
}

getData()

//Send out text via Twilio
function sendText(data) {
    client.messages.create({
      to: `+1${data.mobile}`,
      from: '+17072101123',
      body: `Hi there, ${data.name}. Your workout session is coming up. Are you ready?`
    })
}


app.listen(3000, () => console.log('Listening on port 3000'))
