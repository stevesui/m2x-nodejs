'use strict';

var request = require("request");
var querystring = require("querystring");
var helpers = require("./helpers");

var API_BASE = "http://api-m2x.att.com/v1";
var USER_AGENT = "M2X/0.4.3 (node.js)";

var Client = function(apiKey, apiBase) {
    this.apiKey = apiKey;
    this.apiBase = apiBase || API_BASE;

    this.defaultHeaders = {
        "User-Agent": USER_AGENT,
        "X-M2X-KEY": this.apiKey
    };

    // Define request methods by verb
    ['get', 'post', 'put', 'del', 'head', 'options', 'patch'].
        forEach(function(verb) {
            this[verb] = function(path, options, cb) {
                this.request(verb, path, options, cb);
            };
        }.bind(this));
};

Client.prototype.request = function(verb, path, options, cb) {
    var body, headers;

    if (typeof options === "function") {
        // callback was sent in place of options
        cb = options;
        options = {};
    }

    headers = helpers.extend(this.defaultHeaders, options.headers || {});

    if (! headers["Content-Type"]) {
        if (verb.toLowerCase() === 'get') {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
        } else {
            headers["Content-Type"] = "application/json";
        }
    }

    if (options.params) {
        switch (headers["Content-Type"]) {
        case "application/json":
            body = JSON.stringify(options.params);
            break;
        case "application/x-www-form-urlencoded":
            body = querystring.stringify(options.params);
            break;
        default:
            throw "Unrecognized Content-Type `" + headers["Content-Type"] + "`";
        }
    }

    request({
        url: this.apiBase + path,
        qs: options.qs,
        method: verb,
        headers: headers,
        body: body
    }, function(error, response, body) {
        if (cb) {
            var data = null;

            if (! error) {
                try {
                    data = body ? JSON.parse(body) : {};
                } catch (ex) {
                    error = ex.toString();
                }
            }

            cb.call(this, data, error, response);
        }
    });
};

module.exports = Client;
