var daysPassed = new Date().getDate()
var hoursLeft = 24 - new Date().getHours()
var motivation = document.getElementById('motivation')
motivation.textContent = daysPassed + " days have passed in 2017. " + hoursLeft + " hours are left to get in a great workout today!"
