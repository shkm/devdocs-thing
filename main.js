const { app, BrowserWindow, globalShortcut, shell } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 1200,
    minHeight: 600,
    autoHideMenuBar: true,
    title: 'DevDocs',
  })

  win.loadURL('https://devdocs.io')
  return win
}

app.whenReady().then(() => {
  const window = createWindow()

  // New tab requests go to default browser
  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' }
  });


  globalShortcut.register('Alt+Space', () => {
    if (window.isFocused()) {
      window.hide()
    } else {
      // if (window.isMinimized()) window.restore()
      if (window.isVisible()) {
        window.focus()
      } else {
        window.show()
      }
    }
  })
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
})
