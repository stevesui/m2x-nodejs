"use strict";

var helpers = require("./helpers"),
    Charts;

// Wrapper for AT&T M2X Charts API
//
// See https://m2x.att.com/developer/documentation/charts for AT&T M2X
// HTTP Charts API documentation.
Charts = function(client) {
    this.client = client;
};

// Retrieve a list of charts that belongs to the user
//
// https://m2x.att.com/developer/documentation/v2/charts#List-Charts
Charts.prototype.list = function(cb) {
    return this.client.get("/charts", cb);
};

// Create a new chart
//
// https://m2x.att.com/developer/documentation/v2/charts#Create-Chart
Charts.prototype.create = function(params, cb) {
    return this.client.post("/charts", { params: params }, cb);
};

// Get details of a chart
//
// https://m2x.att.com/developer/documentation/v2/charts#View-Chart-Details
Charts.prototype.view = function(id, cb) {
    return this.client.get(helpers.url("/charts/%s", id), cb);
};

// Update an existing chart
//
// https://m2x.att.com/developer/documentation/v2/charts#Update-Chart
Charts.prototype.update = function(id, params, cb) {
    return this.client.put(
        helpers.url("/charts/%s", id),
        { params: params },
        cb
    );
};

// Delete an existing chart
//
// https://m2x.att.com/developer/documentation/v2/charts#Delete-Chart
Charts.prototype.deleteChart = function(id, cb) {
    return this.client.del(helpers.url("/charts/%s", id), cb);
};

// Render a chart into a png or svg image
//
// https://m2x.att.com/developer/documentation/v2/charts#Render-Chart
Charts.prototype.render = function(id, format, params, cb) {
    return this.client.get(helpers.url("/charts/%s.%s", id, format), cb);
};

module.exports = Charts;
