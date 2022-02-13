const slider = document.querySelectorAll('.slider-button')
const statusWindow = document.querySelectorAll('.device-item-screen')
const closeBtn = document.querySelectorAll('.btn')
const tempData = document.querySelector('.temp-data')
const brightnessData = document.querySelector('.brightness-data')
const colorData = document.querySelector('.color-data')
const powerData = document.querySelector('.power-data')
const connectionData = document.querySelectorAll('.connection')
const statusData = document.querySelectorAll('.status')
const deviceMenu = document.querySelector('.device-menu')

let num = 1
let num2 = 1
let num3 = 0
let num4 = 0

const handleBeform = (e) => {
  slider.forEach((el) => {
    const style = el.style
    el.setAttribute('num', `${num}`)
    num++

    if (num > slider.length) {
      num = 1
    }

    if (el.getAttribute('num') == e.target.getAttribute('num')) {
      style.setProperty('--left', '60%')
    } else if (el.getAttribute('num') != e.target.getAttribute('num')) {
      style.setProperty('--left', '-10%')
    }
  })

  if (num2 > slider.length) {
    num2 = 1
  }

  statusWindow.forEach((el) => {
    el.setAttribute('num', `${num2}`)
    num2++
    if (el.getAttribute('num') == e.target.getAttribute('num')) {
      el.style.visibility = 'visible'
    } else if (el.getAttribute('num') != e.target.getAttribute('num')) {
      el.style.visibility = 'hidden'
    }
  })
}

const downloadData = () => {
  const URL = 'https://mocki.io/v1/9ae92a6f-7db1-4a23-a8fd-2e6151449bc7'
  axios.get(URL).then((res) => {
    const temp = res.data.SmartDevice[2].id.SmartTemperatureSensor.temperature
    tempData.textContent = temp + ' °C'
    const brightness = res.data.SmartDevice[0].id.SmartBulb.brightness
    brightnessData.textContent = brightness + ' %'
    const color = res.data.SmartDevice[0].id.SmartBulb.color
    colorData.textContent = color

    connectionData.forEach((el) => {
      let connection = res.data.SmartDevice[`${num3}`].connectionState
      el.setAttribute('num', `${num3}`)
      num3++

      if (num3 > slider.length - 1) {
        num3 = 0
      }

      el.textContent = connection
    })

    const power = res.data.SmartDevice[1].id.SmartOutlet.powerConsumption
    powerData.textContent = power + ' W'
    console.log(res.data.SmartDevice)
  })
}

const closeScreen = () => {
  statusWindow.forEach((el) => (el.style.visibility = 'hidden'))
  slider.forEach((el) => el.style.setProperty('--left', '-10%'))
}

slider.forEach((el) => {
  el.addEventListener('click', handleBeform)
})

closeBtn.forEach((el) => el.addEventListener('click', closeScreen))

const myInterval = setInterval(downloadData, 5000)