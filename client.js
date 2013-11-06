'use strict';

var request = require("request");
var helpers = require("./helpers");

var API_BASE = "http://api-m2x.att.com/v1";
var USER_AGENT = "M2X/0.0.2 (node.js)";

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
            this[verb] = function(path, qs, params, headers) {
                this.request(verb, path, qs, params, headers);
            };
        }.bind(this));
};

Client.prototype.request = function(verb, path, qs, params, headers) {
    var body;

    headers = helpers.extend(this.defaultHeaders, headers || {});

    if (! headers["Content-Type"]) {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if (params) {
        switch (headers["Content-Type"]) {
        case "application/json":
            body = JSON.stringify(params);
            break;
        case "application/x-www-form-urlencoded":
            body = querystring.stringify(params);
            break;
        default:
            throw "Unrecognized Content-Type `" + headers["Content-Type"] + "`";
        }
    }

    request({
        url: this.apiBase + path,
        qs: qs,
        method: verb,
        headers: headers,
        body: body
    }, function(error, response, body) {
        console.log(error);
        console.log(response);
        console.log(body);
    });
};

module.exports = Client;
