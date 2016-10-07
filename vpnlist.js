const fs = require('fs')
const path = require('path')
const fuzzyfind = require('fuzzyfind')

const file = 'vpnlist'

module.exports = (pluginContext) => {
  const { cwd } = pluginContext
  return (query, env) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(cwd, file), (err, data) => {
        if (err) { reject(err) }
        const vpnlist = data.toString()
          .split('\n')
          .filter(item => item.match(/\|0/))
          .map((item) => {
            const [name, value] = item.split('|')
            return {
              title: name,
              value: {
                name: name,
                connected: value === '1',
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
