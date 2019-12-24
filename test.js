const fs = require('fs')

fs.readFile('1', 'utf8', (err, data) => {
    if (err) {
        throw Error(err)
    }
    fs.readFile(data, 'utf8', (err, data) => {
        if (err) {
            throw Error(err)
        }
        fs.readFile(data, 'utf8', (err, data) => {
            if (err) {
                throw Error(err)
            }
            console.log(data);
        })
        
    })

})