const Promise = require('./promise')

const p = new Promise((resolve, reject) => {
    reject('boom~')
})

p.then(data => {
    console.log(data);
}, err => {
    console.log(err)
})