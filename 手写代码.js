/*
    1、手写一个Promise
*/ 
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';


function MyPromise(fn) {
    const that = this;
    that.state = PENDING;
    that.value = null;
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];
    
    function resolve(value) {
        if (that.state === PENDING) {
            that.state = RESOLVED;
            that.value = value;
            that.resolvedCallbacks.map(cb => cb(that.value))
        }
    }
    
    function reject(value) {
        if (that.state === PENDING) {
            that.state = REJECTED;
            that.value = value;
            that.rejectedCallbacks.map(cb => cb(that.value))
        }
    
    }

    try {
        fn(resolve, reject)
    } catch (error) {
        reject(error)
    }
}



MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r}
    if (that.state === PENDING) {
        that.resolvedCallbacks.push(onFulfilled)
        that.rejectedCallbacks.push(onRejected)
    }
    if (that.state === RESOLVED) {
        onFulfilled(that.value)
    }
    if (that.state === REJECTED) {
        onRejected(that.value)
    }
}

new MyPromise((resolve, reject) => {
        setTimeout(() => {
            console.log("pending");
            // resolve(1)
            reject(22)
        }, 0)
    }).then(value => {
        console.log('resolve', value)
    }, val => {
        console.log('reject', val);
    })

/*
    2、自定义迭代器
*/ 
class Counter {
    constructor(limit) {
        this.count = 1;
        this.limit = limit
    }

    next() {
        if (this.count <= this.limit) {
            return {done: false, value: this.count++};
        } else {
            return {done: true, value: undefined};
        }
    }
    [Symbol.iterator]() {
        return this;
    }
}
class Counter1 {
    constructor(limit) {
        this.limit = limit
    }

    next() {
        if (this.count <= this.limit) {
            return {done: false, value: this.count++};
        } else {
            return {done: true, value: undefined};
        }
    }
    [Symbol.iterator]() {
        let count = 1, limit = this.limit;
        return {
            next() {
                if (count <= limit) {
                    return {done: false, value: count++}
                } else {
                    return {done: true, value: undefined}
                }
            }
        }
    }
}

let counter = new Counter(3)
for (let i of counter) {
    console.log("11",i)
}
for (let i of counter) {
    console.log("11",i)
}

let counter1 = new Counter1(3)
for (let i of counter1) {
    console.log("22",i)
}
for (let i of counter1) {
    console.log("22",i)
}


/**
 * 3、手写函数防抖和函数节流
 */
function debounce(callback, wait) {
    let timer = null;

    return function() {
        let context = this;
        let agrs = arguments;

        if (timer) {
            clearTimeout(timer)
        }
        console.log('start');
        timer = setTimeout(function() {
            callback.apply(context, agrs)
        }, wait)
    }
}

let debounceFn = debounce(function(a, b) {
    console.log(a)
}, 1000) 
debounceFn('first')
setTimeout(function() {debounceFn('second')}, 500)

function throttle(fn, wait) {
    let timer;

    return () => {
        if (timer) {
            return; 
        }
        timer = setTimeout(() => {
            fn();
            timer = null;
        }, wait)
    }
}