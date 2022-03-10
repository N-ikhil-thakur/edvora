const memoize = function(fn) {
    const cache = {};
    return function (...args) {
        if(args in cache){
            console.log('From Cache');
            return cache[String(...args)];
        } else {
            const res = fn(...args);
            cache[String(...args)] = res;
            return res;
        }
    }
}

export default memoize;