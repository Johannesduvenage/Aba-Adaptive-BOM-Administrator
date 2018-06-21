'use strict';

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let window = null;

function initWindow(){
  // Create a new window
  window = new BrowserWindow();

  window.maximize();

  window.loadURL(url.format({
    pathname: path.join(__dirname, './src/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  window.once('ready-to-show', window.show);

  // Emitted when the window is closed.
  window.on('closed', () => {
    window = null; // Windows should be stored in an array, and instance should just be removed
  });
                                                                                window.webContents.openDevTools();
} // #initWindow

app.once('ready', initWindow);
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') { app.quit(); } // Require explicit quit on OSX
});

app.on('activate', () => {
  if(window === null) { initWindow(); } // Reopen window
});
