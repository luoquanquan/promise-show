const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
    constructor(excutor) {
        this.status = PENDING
        this.value = null
        this.reason = null
        
        const resolve = value => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
            }
        }

        const reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
            }
        }
        
        excutor(resolve, reject)
    }

    then(onFullfilled, onRejected) {
        if (this.status === RESOLVED) {
            onFullfilled(this.value)
        }

        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
    }
}

module.exports = Promise