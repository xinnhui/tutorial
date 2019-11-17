const { ipcRenderer } = require('electron')

console.log('webview preload script running')

window.sendIpcMessage = function(message, data) {
  ipcRenderer.sendToHost(message, data)
}

window.addIpcListener = function(channel, callback, configs) {
  if (configs && configs.once) {
    const handler = (e, data) => {
      callback(data)
    }
    ipcRenderer.once(channel, handler)
    return handler
  }
  const handler = (e, data) => {
    callback(data)
  }
  ipcRenderer.on(channel, handler)
  return handler
}

window.removeAllIpcListeners = function(channel) {
  ipcRenderer.removeAllListeners(channel)
}

window.removeIpcListener = function(channel, listener) {
  ipcRenderer.removeListener(channel, listener)
}
