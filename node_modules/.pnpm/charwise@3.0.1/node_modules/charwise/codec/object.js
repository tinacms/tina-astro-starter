var dictEscape = { '?': '?@', '!': '??', '"': '?%' };
function escape(str) {
    if (!/[!"]/.test(str)) { return str; }
    return str.replace(/[\?!"]/g, function (match) {
        return dictEscape[match];
    });

}

var dictUnescape = { '?@': '?', '??': '!', '?%': '"' };
function unescape(str) {
    if (!/\?[%\?@]/.test(str)) { return str; }
    return str.replace(/\?[%\?@]/g, function (match) {
        return dictUnescape[match];
    });
}

exports.factory = function (codec) {

    return {
        encode: encode,
        decode: decode
    };

    function encode(array) {
        if (array === null) { return 'A'; }
        if (!Array.isArray(array)) { throw new Error('can only encode arrays'); }
        var l = array.length;
        if (l == 0) { return 'K!'; }

        var s = encodeItem(array[0]);
        for (var i = 1; i < l; i++) {
            s += '"' + encodeItem(array[i]);
        }

        return 'K'+ s + '!';
    }

    function encodeItem(item) {
        if (typeof item === 'object') {
            return encode(item);
        }
        return escape(codec.encode(item));
    }

    function decode(encoded) {
        if (encoded === 'A') { return null; }
        if (encoded === 'K!') { return []; }
        var items = encoded.split('"');

        var pointers = [[]];
        var array;
        var depth = 0;

        var l = items.length;
        for (var i = 0; i < l; i++) {
            var item = items[i];
            var itemLength = item.length;

            var open = 0;
            while (item[open] == 'K') { open++; }

            var close = 0;
            while (item[itemLength-close - 1] == '!') { close++; }

            var content = item.slice(open, itemLength-close);

            var newdepth = depth + open;
            for (var j = depth; j < newdepth; j++) {
                pointers[j + 1] = [];
                pointers[j].push(pointers[j + 1]);
                depth = newdepth;
                array = pointers[depth];
            }

            if (content.length !== 0) {
                array.push(codec.decode(unescape(content)));
            }

            var newdepth = depth - close;
            for (var j = newdepth; j < depth; j++) {
                pointers[j + 1] = [];
                depth = newdepth;
                array = pointers[depth];
            }

        }
        return pointers[0][0];
    }
}
