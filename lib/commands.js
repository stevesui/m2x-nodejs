"use strict";

var helpers = require("./helpers");

var Commands;

/**
 * @module Commands
 * @description Method for [Wrapper for AT&T M2X Commands API]{@link https://m2x.att.com/developer/documentation/v2/commands} endpoint.
 * @param client {str}
 * @constructor
 */
Commands = function(client) {
    this.client = client;
};

/**
 * @memberOf Commands
 * @description Method for [List Sent Commands]{@link https://m2x.att.com/developer/documentation/v2/commands#List-Sent-Commands} endpoint.
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Commands list
 */
Commands.prototype.list = function(params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }
    return this.client.get("/commands", { qs: params || {} }, callback);
};

/**
 * @memberOf Commands
 * @description Method for [View Command Details]{@link https://m2x.att.com/developer/documentation/v2/commands#View-Command-Details} endpoint.
 * @param id {str} ID of the Commands to view
 * @param callback {function} Response callback
 * @returns Command details
 */
Commands.prototype.view = function(id, callback) {
    return this.client.get(helpers.url("/commands/%s", id), callback);
};

/**
 * @memberOf Commands
 * @description Method for [Send Command]{@link https://m2x.att.com/developer/documentation/v2/commands#Send-Command} endpoint.
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Commands.prototype.send = function(params, callback) {
    return this.client.post("/commands", {
        headers: { "Content-Type": "application/json" },
        params: params
    }, callback);
};

module.exports = Commands;
