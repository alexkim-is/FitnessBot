
//Message at the top
var daysPassed = new Date().getDate()
var hoursLeft = 23.5 - new Date().getHours()
var message = document.querySelector('#message')
var clockMessage = document.getElementById('clock-message')
clockMessage.textContent = daysPassed + " days have passed in 2017. You have "
+ hoursLeft + " hours to get in a great workout today!"
message.appendChild(clockMessage)


//Selecting Fitness Goals
var $goals = document.getElementById('box1')

function makeGoalButton (name, url) {
  var $container = document.createElement('figure')
  var $goal = document.createElement('img')
  var $text = document.createElement('span')
  $container.classList.add('goal-container')
  $container.dataset.id = name
  $text.textContent = name
  $text.classList.add('goal-text')
  $goal.classList.add('goal-pic', name)
  $goal.setAttribute('src', url)
  // $goal.setAttribute('onclick', clickImg)
  $container.appendChild($goal)
  $container.appendChild($text)
  $goals.appendChild($container)
  return $goals
}

var muscle = makeGoalButton('muscle', 'https://goo.gl/BnXbr9')
var fat = makeGoalButton('fat', 'https://goo.gl/BnXbr9')
var health = makeGoalButton('health', 'https://goo.gl/BnXbr9')

//FETCH for CREATING user account
var $formSignup = document.querySelector('#signup')
$formSignup.addEventListener('submit', formSubmit)
function formSubmit(event) {
  event.preventDefault()
  const newObject = new FormData(event.target)
  const data = {
    name: newObject.get('name'),
    age: newObject.get('age'),
    mobile: newObject.get('mobile'),
    schedule: newObject.get('schedule')
  }
  sendJSON(data)
}

function sendJSON(data) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
  return fetch('/signup', options)
    .then(res => res.json())
    .catch(error => console.log(error))
}


//FETCH for DELETING user account
var $formUnsub = document.querySelector('#unsub')
$formUnsub.addEventListener('submit', formUnsub)
function formUnsub(event) {
  event.preventDefault()
  const newObject = new FormData(event.target)
  const dataDel = {
    mobile: newObject.get('b-mobile')
  }
  sendJsonDelete(dataDel)
}

function sendJsonDelete(item) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  }
  return fetch('/unsub', options)
    .then(res => res.json())
    .catch(error => console.log(error))

}
