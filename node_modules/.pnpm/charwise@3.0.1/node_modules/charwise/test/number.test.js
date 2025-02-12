var tape = require('tape')
var codec = require('../codec/number.js');
var encode = codec.encode;
var decode = codec.decode;

function rand (min, max) {
    return Math.random() * (max - min) + min
}

function randQ1 () {
    var dice = Math.floor(rand(0, 3));
    if (dice === 0) {
        return (1+Math.random()) * Math.pow(10, rand(0,9))
    }
    if (dice === 1) {
        return (1+Math.random()) * Math.pow(10, rand(10,99))
    }
    if (dice === 2) {
        return (1+Math.random()) * Math.pow(10, rand(100,300))
    }
}

function randQ2 () {
    var dice = Math.floor(rand(0, 3));
    if (dice === 0) {
        return Math.random() * Math.pow(10, -rand(0,9))
    }
    if (dice === 1) {
        return Math.random() * Math.pow(10, -rand(10,99))
    }
    if (dice === 2) {
        return Math.random() * Math.pow(10, -rand(100,300))
    }
}

function randQ () {
    var dice = Math.floor(rand(0, 4));
    if (dice === 0) { return randQ1(); }
    if (dice === 1) { return randQ2(); }
    if (dice === 2) { return -randQ2(); }
    if (dice === 3) { return -randQ1(); }
}
tape("Number: 1", function (t) {
    t.equals(decode(encode(1)), 1, 'decode inverses encode');
    t.assert(encode(1) > encode(0.999), 'orders well with number before')
    t.assert(encode(1) < encode(1.001), 'orders well with number after')
    t.end();
});

tape("Number: -1", function (t) {
    t.equals(decode(encode(-1)), -1, 'decode inverses encode');
    t.assert(encode(-1) > encode(-1.001), 'orders well with number before')
    t.assert(encode(-1) < encode(-0.999), 'orders well with number after')
    t.end();
});

tape("Number: 0", function (t) {
    t.equals(decode(encode(0)), 0, 'decode inverses encode');
    t.assert(encode(0) > encode(-Number.MIN_VALUE), 'orders well with number before')
    t.assert(encode(0) < encode(Number.MIN_VALUE), 'orders well with number after')
    t.end();
});

tape("Number: Infinity", function (t) {
    t.equals(decode(encode(Infinity)), Infinity, 'decode inverses encode');
    t.assert(encode(Infinity) > encode(Number.MAX_VALUE), 'orders well with number before')
    t.end();
});

tape("Number: Infinity", function (t) {
    t.equals(decode(encode(-Infinity)), -Infinity, 'decode inverses encode');
    t.assert(encode(-Infinity) < encode(Number.MAX_VALUE), 'orders well with number after')
    t.end();
});

tape("Number: random pairs", function (t) {
    var i;
    for (i = 0; i < 1000; i++) {
        var a = randQ();
        var b = randQ();
        if (decode(encode(a)) !== a) {
            t.equals(decode(encode(a)), a, 'decode(encode(' + a + ')) !== ' + a);
            break;
        }
        if (decode(encode(b)) !== b) {
            t.equals(decode(encode(b)), b, 'decode(encode(' + b + ')) !== ' + b);
            break;
        }
        if(a < b && encode(a) >= encode(b)) {
            t.fail('encode(' + a + ') >= encode(' + b + ')');
            break;
        }
        if(a > b && encode(a) <= encode(b)) {
            t.fail('encode(' + a + ') =< encode(' + b + ')');
            break;
        }
        if(a === b && encode(a) !== encode(b)) {
            t.fail('encode(' + a + ') !== encode(' + b + ')');
            break;
        }
    }
    if (i === 1000) {
        t.pass('All random pairs validated')
    }
    t.end();
});

tape("Number: random pairs of close numbers", function (t) {
    var i;
    for (i = 0; i < 100; i++) {
        var a = Math.floor(rand(-10,10));
        var b = a + (Math.random() > 0.5 ? 1 : -1)*0.000000000000001;
        if (decode(encode(a)) !== a) {
            t.equals(decode(encode(a)), a, 'decode(encode(' + a + ')) !== ' + a);
            break;
        }
        if (decode(encode(b)) !== b) {
            t.equals(decode(encode(b)), b, 'decode(encode(' + b + ')) !== ' + b);
            break;
        }
        if(a < b && encode(a) >= encode(b)) {
            t.fail('encode(' + a + ') >= encode(' + b + ')');
            break;
        }
        if(a > b && encode(a) <= encode(b)) {
            t.fail('encode(' + a + ') =< encode(' + b + ')');
            break;
        }
        if(a === b && encode(a) !== encode(b)) {
            t.fail('encode(' + a + ') !== encode(' + b + ')');
            break;
        }
    }
    if (i === 100) {
        t.pass('All random pairs validated')
    }
    t.end();
});
