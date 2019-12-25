const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

resolvePromise = (p2, x, resolve, reject) => {
    if (p2 === x) {
        reject(new TypeError('Circular reference'))
    }
    // 鸭子类型判断 Promise
    // 如果可以有属性的东西
    // 且有 then 方法, 认为它是一个 Promise 对象
    if (
        (typeof x === 'object' && x !== null)
        || typeof x === 'function'
    ) {
        try {
            const {then} = x
            if (typeof then === 'function') {
                then.call(x, y => {
                    resolvePromise(p2, y, resolve, reject)
                }, e => {
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            reject(e)
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(excutor) {
        this.status = PENDING
        this.value = null
        this.reason = null

        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value => {
            if (value instanceof Promise) {
                return value.then(data => resolve(data), e =>  reject(e))
            }

            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }

        const reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            excutor(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }

    then(onFullfilled, onRejected) {
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e}

        const p2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        const x = onFullfilled(this.value)
                        resolvePromise(p2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                });
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(p2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                });
            }

            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFullfilled(this.value)
                            resolvePromise(p2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    });
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason)
                            resolvePromise(p2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    });
                })
            }
        })

        return p2
    }
}

Promise.defer = Promise.deferred = function () {
    const dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
}

module.exports = Promise