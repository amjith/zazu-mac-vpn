const child_process = require('child_process')
const path = require('path')
const fuzzyfind = require('fuzzyfind')

const file = 'vpnlist'

module.exports = (pluginContext) => {
  const { cwd } = pluginContext
  return (query, env) => {
    return new Promise((resolve, reject) => {
      const cmd = 'scutil --nc list'
      child_process.exec(cmd, (err, stdout, stderr) => {
        if (err) { reject(err) }
        const vpnlist = stdout.split('\n').filter(vpn => vpn.match(/ipsec/i))
          .map((item) => {
            const [_, connection, value] = item.match(/\((.*)\).*"(.*)"/)
            const connected = connection === 'Connected'
            return {
              id: value,
              title: value,
              icon: (connected) ? 'fa-stop' : 'fa-play',
              value: {
                name: value,
                connected: connected,
              }
            }
          })

        // Filter
        const filteredVPN = fuzzyfind(query, vpnlist, {accessor: (item) => item.title})
        resolve(filteredVPN)
      })
    })
  }
}
