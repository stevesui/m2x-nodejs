'use strict';

var request = require("request");
var querystring = require("querystring");

var Client = require("./client");
var Feeds = require("./feeds");
var Keys = require("./keys");

var M2X = function(apiKey, apiBase) {
    this.client = new Client(apiKey, apiBase);
    this.keys = new Keys(this.client);
    this.feeds = new Feeds(this.client);
};

M2X.prototype.status = function(cb) {
    return this.client.get("/status", cb);
};

module.exports = M2X;
