"use strict";

var helpers = require("./helpers");
var Jobs;

/**
 * @module Jobs
 * @description Method for [Wrapper for AT&T M2X Jobs API]{@link https://m2x.att.com/developer/documentation/v2/jobs} endpoint.
 * @param client {object}
 * @param keysAPI {str}
 * @constructor
 */
Jobs = function(client, keysAPI) {
    this.client = client;
    this.keysAPI = keysAPI;
};

/**
 * @memberOf Jobs
 * @description Method for [View Job Details]{@link https://m2x.att.com/developer/documentation/v2/jobs#View-Job-Details} endpoint.
 * @param id {str} ID of the Job
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Jobs.prototype.view = function(id, callback) {
    return this.client.get(helpers.url("/jobs/%s", id), callback);
};

module.exports = Jobs;
