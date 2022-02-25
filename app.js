//#region libs
const { app, BrowserWindow, ipcMain } = require('electron')
const ipc = ipcMain
const path = require('path')

//Trace Module
const {err, wrn, inf, not, dbg} = require('./trace.js');
//#endregion

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 480,
      resizable: false,
      frame: false,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          preload: path.join(__dirname, 'preload.js')
      }
    })

    win.loadFile('index.html')
    win.setBackgroundColor('#000000')

    ipc.on('closeApp', () => {
        inf("Window closed")
        win.close()
    })
}

app.whenReady().then(() => {
    createWindow()
    inf("Window created")
})

app.on('window-all-closed', () => {
    wrn("No more windows open")
    inf("Closing application")
    if (process.platform !== 'darwin') app.quit()
})

try {
    require('electron-reloader')(module)
    not("Application reloaded")
  } catch (_) {}