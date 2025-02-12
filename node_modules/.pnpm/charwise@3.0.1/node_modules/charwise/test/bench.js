var bytewise = require('bytewise')
var charwise = require('../')

var randString = function()  {
    var a = ' abcdefghijklmnopqrstuvwxyz';
    var str = '';
    for (var i = 0; i < 4 + Math.random() * 10; i++) {
        str += a[Math.floor(Math.random() * a.length)];
    }
    return str;
}
var randArray = function (opt, depth) {
    depth = depth || 0;
    var length = Math.random() < (depth === 0 ? 0 : 0.5) ? 0 : Math.ceil(Math.random() * Math.max(0, opt.length));
    var array = []
    for(var i = 0; i < length; i++) {
        if (opt.depth != 0 && Math.random() < Math.max(0, opt.depth-depth)/opt.depth) {
            array.push(randArray(opt, depth + 1));
        } else {
            var dice = Math.floor(Math.random() * 5)
            if(dice === 0) {
                array.push(randString())
            }
            if(dice === 1) {
                array.push(Math.random() > 0.5 ? true : false);
            }
            if(dice === 2) {
                array.push(Math.random() > 0.5 ? null : undefined);
            }
            if(dice === 3) {
                array.push((Math.random()*2 - 1));
            }
            if(dice === 4) {
                array.push((Math.random()*2 - 1)*1e10);
            }
        }
    }
    return array;
}

var items = [];
for(var i = 0; i < 100; i++) {
    items.push(randArray({
        depth: 0,
        length: 8
    }));
}

function bench (fn, items, samples) {
    var time = process.hrtime();
    var iter = 0;
    var l = items.length;
    while(process.hrtime(time)[0] < 1) {
        fn(items[iter%l]);
        iter++;
    }
    return iter;

}

var bencode = bench(bytewise.encode, items);
console.log('bytewise encode', Math.floor(bencode));

var cencode = bench(charwise.encode, items);
console.log('charwise encode', Math.floor(cencode), 'x' + Math.floor(cencode / bencode * 10)/10);

var bdecode = bench(bytewise.decode, items.map(function(item) { return bytewise.encode(item); }));
console.log('bytewise decode', Math.floor(bdecode));

var cdecode = bench(charwise.decode, items.map(function(item) { return charwise.encode(item); }));
console.log('charwise decode', Math.floor(cdecode), 'x' + Math.floor(cdecode / bdecode * 10)/10);
