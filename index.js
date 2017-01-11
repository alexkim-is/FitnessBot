
var daysPassed = new Date().getDate()
var hoursLeft = 23.5 - new Date().getHours()

var clockMessage= document.getElementById('clock-message')
clockMessage.textContent = daysPassed + " days have passed in 2017. You have "
+ hoursLeft + " hours to get in a great workout today!"
