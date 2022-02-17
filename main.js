const statusWindow = document.querySelectorAll('.device-item-screen')
const closeBtn = document.querySelectorAll('.btn')
const tempData = document.querySelector('.temp-data')
const brightnessData = document.querySelector('.brightness-data')
const colorData = document.querySelector('.color-data')
const powerData = document.querySelector('.power-data')
const connectionData = document.querySelectorAll('.connection')
const statusData = document.querySelectorAll('.status')
const deviceMenu = document.querySelector('.device-menu')
const itemsContainer = document.querySelector('.items-container')

let classIcon = 0

const renderDevices = async () => {
  let uri = 'http://localhost:3000/api/v1/devices'
  
  const res = await fetch(uri)
  const devices = await res.json()
  
  
  const iconsArr = [ "fas fa-lightbulb", "fas fa-plug", "fas fa-temperature-high", ]
  
  let templateDevices = []

  devices.forEach(device => {
    templateDevices += `
    <div class="items">
    <h3>Device type:</h3>
    <h6>${device.type}</h6>
    <i class="${iconsArr[classIcon]}"></i>
    <h6>${device.name}</h6>
    <div class="slider-button" id=${device.id} onclick="handleBeform(${device.id})"></div>
    <h6>${device.connectionState}</h6>
    </div>
    `
    console.log(device.type)
    classIcon ++
  })
  itemsContainer.innerHTML = templateDevices
  if(templateDevices > templateDevices.length) {templateDevices = 0}
  console.log(templateDevices)
  
  let templateWindowScreen = []
  
  devices.forEach(device => {
    const onOff = device.isTurnedOn == true ? "ON" : "OFF"
    
    if(device.id == 1) {
      
      templateWindowScreen += `
      <div id=${device.id} class="device-item-screen resizable">
              <button class="btn" onclick="closeScreen()">x</button>
              <div class="status-window item">
                <h4>Brightness:</h4>
                <h1 class="brightness-data">${device.brightness} %</h1>
              </div>
              <div class="item status-window">
                <h4>Color:</h4>
                <h1 class="color-data" style="color: ${device.color}">${device.color}</h1>
              </div>
              <div class="status-window item">
              <h4>ON/OFF:</h4>
              <h1 class="power-data">${onOff}</h1>
            </div>
            </div>
            `
    } else if (device.id == 2) {
    
      templateWindowScreen += `
      <div id=${device.id} class="device-item-screen resizable">
              <button id="${device.id}" class="btn" onclick="closeScreen()">x</button>
              <div class="status-window item" id=${device.id}>
                <h4>On/Off:</h4>
                <h1 class="brightness-data">${onOff}</h1>
              </div>
              <div class="item status-window" id=${device.id}>
                <h4>Power Consumtion:</h4>
                <h1 class="color-data">${device.powerConsumption} Watt</h1>
              </div>
            </div>
            `
    } else if (device.id == 3) {
      
      templateWindowScreen += `
      <div id=${device.id} class="device-item-screen resizable">
              <button id="${device.id}" class="btn" onclick="closeScreen()">x</button>
              <div class="status-window item" id=${device.id}>
                <h4>Temperature:</h4>
                <h1 class="brightness-data">${device.temperature} °C</h1>
              </div>
            </div>
            `
          }
            
  })
  deviceMenu.innerHTML = templateWindowScreen
}


const handleBeform = (e) => {
  const slider = document.querySelectorAll('.slider-button')
  const statusWindow = document.querySelectorAll('.device-item-screen')
  slider.forEach(el => {
    if (el.getAttribute('id') == e) {
      el.style.setProperty('--left', '60%')
    } else if (el.getAttribute('id') != e) {
      el.style.setProperty('--left', '-10%')
    }
  })
  
  statusWindow.forEach((el) => {
    if (el.getAttribute('id') == e) {
      el.style.visibility = 'visible'
    } else if (el.getAttribute('id') != e) {
      el.style.visibility = 'hidden'
    }
  })
}

const closeScreen = () => {
  const slider = document.querySelectorAll('.slider-button')
  const statusWindow = document.querySelectorAll('.device-item-screen')
  statusWindow.forEach(el => {
    el.style.visibility = 'hidden'
  slider.forEach(el => {
    el.style.setProperty('--left', '-10%')
  })  
  })
}
  
  closeBtn.forEach((el) => el.addEventListener('click', closeScreen))
  
  // const myInterval = setInterval(downloadData, 5000)
  window.addEventListener('DOMContentLoaded', () => renderDevices())