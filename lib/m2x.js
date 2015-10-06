"use strict";

var Client = require("./client");

var Charts        = require("./charts");
var Collections   = require("./collections");
var Devices       = require("./devices");
var Distributions = require("./distributions");
var Keys          = require("./keys");

var M2X;

M2X = function(apiKey, apiBase) {
    this.client = new Client(apiKey, apiBase);

    this.charts        = new Charts(this.client);
    this.collections   = new Collections(this.client);
    this.devices       = new Devices(this.client, this.keys);
    this.distributions = new Distributions(this.client);
    this.keys          = new Keys(this.client);
};

M2X.prototype.status = function(callback) {
    return this.client.get("/status", callback);
};

module.exports = M2X;
