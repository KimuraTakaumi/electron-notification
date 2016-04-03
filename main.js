'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow;
const notifier = require('node-notifier');

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', function () {
    createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

exports.notificationMainProcess = function () {
    notifier.notify({
        title: 'Notification Main Process',
        message: 'Nofitificaiton Main Process Message',
        icon: 'file://' + __dirname + '/img/icon.png',
        sound: true,
        wait: false,
        contentImage: 'file://' + __dirname + '/img/icon.png'
    }, function (err, response) {
        console.log(response);
    });

    notifier.on('timeout', function (notifierObject, options) {
        console.log('notification timeout');
    });
};

