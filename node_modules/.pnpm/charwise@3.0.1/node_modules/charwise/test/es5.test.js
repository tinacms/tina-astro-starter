var tape = require('tape')
var glob = require('glob')
var check = require('check-ecmascript-version-compatibility');

tape('ES5 compliant', function (t) {
    var onAllFilesDone = function (files) {
        var count = 0;
        return function (file) {
            return function (err) {
                if (err) {
                    t.fail('in ('+file + ') : ' + err.message);
                };
                count++;
                if (files.length === count) {
                    t.pass();
                    t.end();
                }
            }
        }
    }
    glob('./!(node_modules)/*.js', function (err, files) {
        console.log(files);
        var doneForFile = onAllFilesDone(files);
        files.forEach(function (file) {
            check(file, doneForFile(file));
        })
    })
})
