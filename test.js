// const Promise = require('./promise')

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello world~')
    })
})

p.then(data => {
    console.log(data);
}, err => {
    console.log(err)
})