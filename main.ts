import { app, BrowserWindow, dialog } from 'electron'

let mainWindow: BrowserWindow | null = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true, // Keep the window frame
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  mainWindow.setMenu(null) // Hide the menu bar
  mainWindow.loadURL('http://localhost:5173') // Vite dev server URL

  // Add confirmation dialog on close
  mainWindow.on('close', (event) => {
    // Prevent closing the window immediately
    event.preventDefault()

    // Show confirmation dialog
    const response = dialog.showMessageBoxSync(mainWindow, {
      type: 'warning',
      buttons: ['Cancel', 'Close'],
      defaultId: 1,
      title: 'Confirm Close',
      message: 'Are you sure you want to close the app?',
    })

    // If the user clicks 'Close', allow the window to close
    if (response === 1) {
      mainWindow?.destroy() // Close the window explicitly
      app.quit() // Quit the app after closing the window
    }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
