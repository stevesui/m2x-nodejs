"use strict";

var Client = require("./client"),
    Keys = require("./keys"),
    Devices = require("./devices"),
    Charts = require("./charts"),
    Distributions = require("./distributions"),
    M2X;

M2X = function(apiKey, apiBase) {
    this.client = new Client(apiKey, apiBase);

    this.keys = new Keys(this.client);
    this.devices = new Devices(this.client, this.keys);
    this.charts = new Charts(this.client);
    this.distributions = new Distributions(this.client);
};

M2X.prototype.status = function(cb) {
    return this.client.get("/status", cb);
};

module.exports = M2X;
