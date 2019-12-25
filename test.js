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
    .then(data => readFile(data), e => {console.log(e)})
    .then(data => readFile(data), e => {console.log(e)})
    .then(data => {console.log(data)}, e => {console.log(e)})


