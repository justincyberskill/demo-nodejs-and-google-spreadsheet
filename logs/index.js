const fs = require('fs')

const log = (data, pathname = './logs/log.json') => {
  const callback = (err) => {
    if (err) {
      console.error(err.message)
      return
    }
    console.log('📝  Data has been logged!')
  }
  fs.writeFile(pathname, data, { encoding: 'utf8' }, callback)
}

module.exports = { log }
