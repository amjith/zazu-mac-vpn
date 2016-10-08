const child_process = require('child_process')

module.exports = (pluginContext) => {
  return (value) => {
    const cmd = (value.connected) ? `scutil --nc stop "${value.name}"`:`scutil --nc start "${value.name}"`
    return new Promise((resolve, reject) => {
      child_process.exec(cmd, resolve)
    })
  }
}
