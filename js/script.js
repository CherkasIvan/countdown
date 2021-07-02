const items = document.querySelectorAll('.countdown-item > h2')
const countDownEl = document.querySelector('.countdown')

let countDownDate = new Date(2023, 11, 18, 0, 0, 0).getTime()

function getCountdownTime() {
  let now = new Date().getTime()
  let distance = countDownDate - now

  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000

  let days = Math.floor(distance / oneDay)
  let hours = Math.floor(distance % oneDay / oneHour)
  let minutes = Math.floor(distance % oneHour / oneMinute)
  let seconds = Math.floor(distance % oneMinute / 1000)

  const values = [days, hours, minutes, seconds]

  items.forEach(function (item, index) {
    item.textContent = values[index]
  })

  if (distance <= 0){
    clearInterval(countDown)
    countDownEl.innerHTML = '<h4 class="expired">Время вышло </h4>'
  }
}

let countDown = setInterval(getCountdownTime, 1000)
getCountdownTime()