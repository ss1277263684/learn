/********** 实现 instanceof ***********/
function myInstanceof(target, origin) {
    while (target.__proto__) {
        if (target.__proto__ === origin.prototype) {
            return true
        }
        target = target.__proto__
    }
    return false
}
let a = {a: 11}
console.log("实例判断》》》",myInstanceof(a, Array))


/********** 实现 map ***********/
Array.prototype.myMap = function(fn, thisValue) {
    let temp = []
    thisValue = thisValue || []
    let arr = this;
    for (let i in arr) {
        temp.push(fn(arr[i], i, arr))
    }
    return temp
}
Object.defineProperty(Array.prototype, "myMap", { enumerable: false })
let b = [1,2,3,4]
console.log('自定义map》》》', b.myMap(el => el*2))


/********** 数据类型 ***********/
function type(p) {
    return Object.prototype.toString.call(p).split(" ")[1].slice(0,-1)
}
console.log("数据类型》》》",type(1));

/********** 数组去重 ***********/
function unique1(arr) {
    // 无法去重 [], {}
    return [...new Set(arr)]
}
function unique2(arr) {
    // 1 和 '1' 会判定相同而移除一个
    let temp = {}
    return arr.filter(el => {
        if (!temp[el]) {
            temp[el] = true;
            return true
        }
    })
}
function unique3(arr) {
    // 不能去重 NaN
    let result = [];
    arr.forEach(el => {
        if (result.indexOf(el) == -1) {
            result.push(el)
        }
    })
    return result
}
let arr = [1, 1, '1', '1', {}, {}, [], [], NaN, NaN, unique1, unique1]
console.log('数组去重1》》》', unique1(arr))
console.log('数组去重1》》》', unique2(arr))
console.log('数组去重1》》》', unique3(arr))


/********** 字符串去重 ***********/
String.prototype.unique = function() {
    var obj = {},
        str = '',
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            str += this[i];
            obj[this[i]] = true;
        }
    }
    return str;
}

console.log("字符串去重》》》", "abababccdd".unique())