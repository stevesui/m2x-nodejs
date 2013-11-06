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

M2X.prototype.status = function() {
    return this.client.get("/status");
};

module.exports = M2X;
