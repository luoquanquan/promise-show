const fs = require('fs')
// const Promise = require('./promise')

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

const p = new Promise((resolve, reject) => {
    resolve(1)
})

p.then(data => {
    console.log('data ', data)
}, e => {
    console.log('err ', e)
})

let np = new Promise((resolve) => {
    resolve()
})
let np2 = np.then(() => np2)
np2.then(null, reason => {
    console.log(reason);
})


