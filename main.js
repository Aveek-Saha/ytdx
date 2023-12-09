const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const isDev = require('electron-is-dev');

// If in development use electron-reload to watch for
// changes in the current directory
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
    });
}

function createWindow() {
    // Create the browser window with node integration
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'public/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    // Open the DevTools only if app is in development
    // If in production, don't show.
    if (isDev) win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
