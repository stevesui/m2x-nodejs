"use strict";

var helpers = require("./helpers");

/**
 * @module Keys
 * @description Method for [Wrapper for AT&T M2X Keys API]{@link https://m2x.att.com/developer/documentation/keys} endpoint.
 * @param client {str}
 * @constructor
 */
var Keys = function(client) {
    this.client = client;
};

/**
 * @memberOf Keys
 * @description Method for [List Keys]{@link https://m2x.att.com/developer/documentation/v2/keys#List-Keys} endpoint.
 * @param callback {function} Response callback
 * @returns Keys list
 */
Keys.prototype.list = function(callback) {
    return this.client.get("/keys", callback);
};

/**
 * @memberOf Keys
 * @description Method for [View Key Details]{@link https://m2x.att.com/developer/documentation/v2/keys#View-Key-Details} endpoint.
 * @param key {str} Key associated with a developer account
 * @param callback {function} Response callback
 * @returns Key details
 */
Keys.prototype.view = function(key, callback) {
    return this.client.get(helpers.url("/keys/%s", key), callback);
};

/**
 * @memberOf Keys
 * @description Method for [Delete Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Delete-Key} endpoint.
 * @param key {str} Key associated with a developer account
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Keys.prototype.del = function(key, callback) {
    return this.client.del(helpers.url("/keys/%s", key), callback);
};

/**
 * @memberOf Keys
 * @description Method for [Create Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Create-Key} endpoint.
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns API Key details
 */
Keys.prototype.create = function(params, callback) {
    return this.client.post("/keys", {
        headers: { "Content-Type": "application/json" },
        params: params
    }, callback);
};

/**
 * @memberOf Keys
 * @description Method for [Update Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Update-Key} endpoint.
 * @param key {str} Key associated with a developer account
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Keys.prototype.update = function(key, params, callback) {
    return this.client.put(helpers.url("/keys/%s", key), {
        headers: { "Content-Type": "application/json" },
        params: params
    }, callback);
};

/**
 * @memberOf Keys
 * @description Method for [Regenerate Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Regenerate-Key} endpoint.
 * Note that if you regenerate the key that you're using for authentication then you would need to change your scripts to start using the new key token for all subsequent requests.
 * @param key {str} Key associated with a developer account
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Keys.prototype.regenerate = function(key, callback) {
    return this.client.post(helpers.url("/keys/%s/regenerate", key), callback);
};

module.exports = Keys;
