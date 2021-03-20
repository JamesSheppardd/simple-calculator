const { remote, ipcRenderer } = require("electron");

function getCurrentWindow() {
  return remote.getCurrentWindow();
}

remote.getCurrentWindow().webContents.openDevTools();

function openMenu(x, y) {
  ipcRenderer.send(`display-app-menu`, { x, y });
}

function minimizeWindow(browserWindow = getCurrentWindow()) {
  if (browserWindow.minimizable) {
    // browserWindow.isMinimizable() for old electron versions
    browserWindow.minimize();
  }
}


function closeWindow(browserWindow = getCurrentWindow()) {
  console.log("close");
  browserWindow.close();
}


module.exports = {
  getCurrentWindow,
  openMenu,
  minimizeWindow,
  closeWindow,
};