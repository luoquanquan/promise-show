const fs = require('fs')
const Promise = require('./promise')

const readFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            reject(err)
        }
        resolve(data)
    })
})

readFile('1')
    .then(data => data, e => {console.log(e)})
    .then()
    .then(data => {console.log(data)}, e => {console.log(e)})


