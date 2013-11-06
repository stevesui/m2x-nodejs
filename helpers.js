'use strict';

var util = require('util');

function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function(source) {
        var prop;
        for (prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

function url(format) {
    var params = Array.prototype.slice.call(arguments, 1).map(function(param) {
        return encodeURIComponent(param);
    });

    return util.format.apply(this, [format].concat(params));
}

module.exports = {
    extend: extend,
    url: url
};
