"use strict";

var helpers = require("./helpers");

// Wrapper for AT&T M2X Keys API
//
// https://m2x.att.com/developer/documentation/keys
var Keys = function(client) {
    this.client = client;
};

// List all the Master API Keys that belongs to the authenticated user
//
// https://m2x.att.com/developer/documentation/v2/keys#List-Keys
Keys.prototype.list = function(cb) {
    return this.client.get("/keys", cb);
};

// Return the details of the API Key supplied
//
// https://m2x.att.com/developer/documentation/v2/keys#View-Key-Details
Keys.prototype.view = function(key, cb) {
    return this.client.get(helpers.url("/keys/%s", key), cb);
};

// Delete the supplied API Key
//
// https://m2x.att.com/developer/documentation/v2/keys#Delete-Key
Keys.prototype.del = function(key, cb) {
    return this.client.del(helpers.url("/keys/%s", key), cb);
};

// Create a new API Key
//
// https://m2x.att.com/developer/documentation/v2/keys#Create-Key
Keys.prototype.create = function(params, cb) {
    return this.client.post("/keys", {
        headers: { "Content-Type": "application/json" },
        params: params
    }, cb);
};

// Update API Key properties
//
// https://m2x.att.com/developer/documentation/v2/keys#Update-Key
Keys.prototype.update = function(key, params, cb) {
    return this.client.put(helpers.url("/keys/%s", key), {
        headers: { "Content-Type": "application/json" },
        params: params
    }, cb);
};

// Regenerate an API Key token
//
// Note that if you regenerate the key that you're using for
// authentication then you would need to change your scripts to
// start using the new key token for all subsequent requests.
//
// https://m2x.att.com/developer/documentation/v2/keys#Regenerate-Key
Keys.prototype.regenerate = function(key, cb) {
    return this.client.post(helpers.url("/keys/%s/regenerate", key), cb);
};

module.exports = Keys;
