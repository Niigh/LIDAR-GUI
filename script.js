const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

//Trace Module
const {err, wrn, inf, not, dbg} = require('./trace.js');

var closeBin = document.getElementById('closeBin');

closeBin.addEventListener('click', () => {
    inf("Cliked on close button")
    ipc.send('closeApp')
})