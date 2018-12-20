function add(a, b, cb) {
  cb(a + b); // synchronous callback
}

function asyncAdd(a, b, cb) {
  setTimeout(() => cb(a + b), 2000); // asynchronous callback
}

console.log('first');
add(10, 20, ans => { console.log(ans) });
console.log('last');

// first
// 30
// last

console.log('');

console.log('first');
asyncAdd(10, 20, ans => { console.log(ans) });
console.log('last')

// first
// last
// 30
