//Message at the top
var daysPassed = new Date().getDate()
var hoursLeft = 23.5 - new Date().getHours()

const clockMessage = new Vue({
  el: '#clock-message',
  data: {
    keyword: `${daysPassed} days have passed in 2017. You have ${hoursLeft} hours to get in a great workout today.`
  }
})


class Goal {
  constructor(title, description, img) {
    this.title = title
    this.description = description
    this.img = img
  }
}

const goals = new Vue({
  el: '#wrapper',
  data: {
    keyword: '',
    clicked: true,
    goalList: [
       new Goal('Muscle','Muscle. Go big or go home. Be a hero, fast. No pain, no gain.','https://goo.gl/SwD631'),
       new Goal('Lean','Lean. Abs. Lose fat. Be agile and fast. Get ripped. Healthy','https://goo.gl/p3Bhgd'),
       new Goal('Healthy','Get healthy. Live long. Improve your cardio. Maybe a little muscle.','https://goo.gl/OIYD1p'),
       new Goal('Muscle','Muscle. Abs. Go big or go home. Be a hero, fast. Change.','https://goo.gl/SwD631'),
       new Goal('Lean','Lean. Lose fat. Be agile and fast. Get ripped. Healthy','https://goo.gl/p3Bhgd'),
       new Goal('Fun','I just wanna have fun while staying healthy. Your new lifestyle','https://goo.gl/OIYD1p')
    ]
  },
  methods: {
    clicked: function() {
      this.goal.title.setAttribute('style', 'color: blue')
    }
  },
  computed: {
    filteredList() {
      return this.goalList.filter((goal) => {
        return goal.description.toLowerCase().includes(this.keyword.toLowerCase())
      })
    }
  }
})


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
