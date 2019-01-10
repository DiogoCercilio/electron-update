const { ipcRenderer } = require('electron');

const select = selector => document.querySelector(selector)

let container = select('#messages')
let progressBar = select('#progressBar')
let version = select('#version')

ipcRenderer.on('message', (event, text) => {
    console.log('onmessage');
  let message = document.createElement('div')
  message.innerHTML = text
  container.appendChild(message)

})

ipcRenderer.on('version', (event, text) => {
    console.log('version...');

  version.innerText = text
})

ipcRenderer.on('download-progress', (event, text) => {
    console.log('download-progress');

  progressBar.style.width = `${text}%`
})