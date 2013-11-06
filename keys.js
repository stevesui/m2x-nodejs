'use strict';

// Wrapper for AT&T M2X Keys API
//
// See https://m2x.att.com/developer/documentation/keys for AT&T M2X
// HTTP Keys API documentation.
var Keys = function(client) {
    this.client = client;
};

// List all the Master API Keys that belongs to the user associated
// with the AT&T M2X API key supplied when initializing M2X
Keys.prototype.list = function() {
    return this.client.get("/keys");
};

// Return the details of the API Key supplied
Keys.prototype.view = function(key) {
    return this.client.get(this.url("/keys/%s", key));
};

// Delete the supplied API Key
Keys.prototype.del = function(key) {
    return this.client.del(this.url("/keys/%s", key));
};

// Create a new API Key
//
// Note that, according to the parameters sent, you can create a
// Master API Key or a Feed/Stream API Key. See
// https://m2x.att.com/developer/documentation/keys#Create-Key for
// details on the parameters accepted by this method.
Keys.prototype.create = function(params) {
    return this.client.post("/keys", null, params, {
        "Content-Type": "application/json"
    });
};

// Update API Key properties
//
// This method accepts the same parameters as create API Key and
// has the same validations. Note that the Key token cannot be
// updated through this method.
Keys.prototype.update = function(key, params) {
    return this.client.put(this.url("/keys/%s", key), null, params, {
        "Content-Type": "application/json"
    });
};

// Regenerate an API Key token
//
// Note that if you regenerate the key that you're using for
// authentication then you would need to change your scripts to
// start using the new key token for all subsequent requests.
Keys.prototype.regenerate = function(key) {
    return this.client.post(this.url("/keys/%s/regenerate", key), null, {});
};

module.exports = Keys;
