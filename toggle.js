const child_process = require('child_process')

module.exports = (pluginContext) => {
  return (value) => {
    const cmd = (value.connected) ? `scutil --nc start "${value.name}"`:`scutil --nc stop "${value.name}"`
    return Promise.resolve(child_process.exec(cmd))
  }
}
