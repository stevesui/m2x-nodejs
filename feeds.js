'use strict';

var helpers = require("./helpers");

// Wrapper for AT&T M2X Feed API
//
// See https://m2x.att.com/developer/documentation/feed for AT&T M2X
// HTTP Feed API documentation.
var Feeds = function(client) {
    this.client = client;
};

// List all the feeds that belong to the user associated with the
// M2X API key supplied when initializing M2X
Feeds.prototype.list = function() {
    return this.client.get("/feeds");
};

// Return the details of the supplied feed
Feeds.prototype.view = function(id) {
    return this.client.get(helpers.url("/feeds/%s", id));
};

// Return a list of access log to the supplied feed
Feeds.prototype.log = function(id) {
    return this.client.get(helpers.url("/feeds/%s/log", id));
};

// Return the current location of the supplied feed
//
// Note that this method can return an empty value (response status
// of 204) if the feed has no location defined.
Feeds.prototype.location = function(id) {
    return this.client.get(helpers.url("/feeds/%s/location", id));
};

// Update the current location of the feed
Feeds.prototype.updateLocation = function(id, params) {
    return this.client.put(helpers.url("/feeds/%s/location", id), null, params);
};

// Return a list of the associated streams for the supplied feed
Feeds.prototype.streams = function(id) {
    return this.client.get(helpers.url("/feeds/%s/streams", id));
};

// Return the details of the supplied stream
Feeds.prototype.stream = function(id, name) {
    return this.client.get(helpers.url("/feeds/%s/streams/%s", id, name));
};

// Return a list with the latest values from a stream
Feeds.prototype.streamValues = function(id, name) {
    return this.client.get(helpers.url("/feeds/%s/streams/%s/values", id, name));
};

// Update stream's properties
//
// If the stream doesn't exist it will create it. See
// https://m2x.att.com/developer/documentation/feed#Create-Update-Data-Stream
// for details.
Feeds.prototype.updateStream = function(id, name, params) {
    return this.client.put(helpers.url("/feeds/%s/streams/%s", id, name), null, params);
};

// Delete the stream (and all its values) from the feed
Feeds.prototype.deleteStream = function(id, name) {
    return this.client.del(helpers.url("/feeds/%s/streams/%s", id, name));
};

// Returns a list of API keys associated with the feed
Feeds.prototype.keys = function(id) {
    return this.client.get("/keys", { feed: id });
};

// Creates a new API key associated to the feed
//
// If a parameter named `stream` is supplied with a stream name, it
// will create an API key associated with that stream only.
Feeds.prototype.createKey = function() {
    // TODO
};

// Updates an API key properties
Feeds.prototype.updateKey = function() {
    // TODO
};

module.exports = Feeds;
