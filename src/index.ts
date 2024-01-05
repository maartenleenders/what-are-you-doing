import { app, BrowserWindow, globalShortcut, screen } from 'electron';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


//tracking_window
declare const TRACKING_WINDOW_WEBPACK_ENTRY: string;
declare const TRACKING_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}


let trackingWindow: BrowserWindow | undefined = undefined

const createMainWindow = (): void => {
  const window = new BrowserWindow({
    height: 600,
    width: 1200,
    title: 'What ya working on?',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // window.webContents.openDevTools()
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
}

const createTrackingWindow = (): void => {

  if(trackingWindow) {
    return
  }

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  const windowHeight = 105

  // Create the browser window.
  trackingWindow = new BrowserWindow({
    height: windowHeight,
    width: 400,
    x: width - (400 + 20),
    y: height - (windowHeight + 20),
    type: 'panel',
    titleBarStyle: 'hidden',
    resizable: false,
    alwaysOnTop: true,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    focusable: true,
    hiddenInMissionControl: true,
    title: 'What ya working on?',
    show: false,
    webPreferences: {
      preload: TRACKING_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  trackingWindow.showInactive()

  trackingWindow.on('closed', () => {
    trackingWindow = undefined
  })

  // and load the index.html of the app.
  trackingWindow.loadURL(TRACKING_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

function setTimer( timeOut: number, functionToRun: () => void ) {
  setTimeout(() => {
    const verifiedFunctionToRun = typeof functionToRun === 'function' ? functionToRun : () => {/*do nothing*/};
    verifiedFunctionToRun();
    setTimer( timeOut, functionToRun );
  }, timeOut )
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

  createMainWindow()

  const ret = globalShortcut.register('CmdOrCtrl+Alt+A', () => {
    console.log('CmdOrCtrl+Alt+A is pressed')
    createTrackingWindow()
  })

  setTimer( 15 * 60 * 1000, createTrackingWindow );

  if (!ret) {
    throw new Error('Failed to register shortcut')
  }

});

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
