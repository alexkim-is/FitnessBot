
//Message at the top
var daysPassed = new Date().getDate()
var hoursLeft = 23.5 - new Date().getHours()
var clockMessage = document.getElementById('clock-message')
clockMessage.textContent = daysPassed + " days have passed in 2017. You have "
+ hoursLeft + " hours to get in a great workout today!"

//Selecting Fitness Goals
var $goals = document.getElementById('goals')

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
  $container.appendChild($goal)
  $container.appendChild($text)
  $goals.appendChild($container)
  return $goals
}

var muscle = makeGoalButton('muscle', 'https://goo.gl/BnXbr9')
var fat = makeGoalButton('fat', 'https://goo.gl/IbMmFB')
var health = makeGoalButton('health', 'https://goo.gl/uJ7yH6')

// An EventListener when a goal is selected.
// $theGoals.addEventListener('click', function (event) {
//   event.preventDefault()
//   if (event.target.className !== 'goal-pic') return
//   if (event.target.className == 'goal-pic'+ name) {return}
// })
