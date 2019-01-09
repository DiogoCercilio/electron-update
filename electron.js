const {app, BrowserWindow, ipcMain} = require('electron');
const {autoUpdater} = require("electron-updater");

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => app.quit());
}

app.on('ready', function() {
  createWindow();
  autoUpdater.checkForUpdates();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
  if (mainWindow === null) createWindow(); 
})

autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('updateReady');
});

// when receiving a quitAndInstall signal, quit and install the new version ;)
ipcMain.on("quitAndInstall", (event, arg) => {
  autoUpdater.quitAndInstall();
})