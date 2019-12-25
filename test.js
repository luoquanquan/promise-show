const fs = require('fs')

const readFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            reject(err)
        }
        resolve(data)
    })
})

readFile('1').then(data => {
        readFile(data).then(data => {
            readFile(data).then(data => {
                console.log(data)
            }, err => {console.log(err)})
        }, err => {console.log(err)})
    }, err => {console.log(err)})


