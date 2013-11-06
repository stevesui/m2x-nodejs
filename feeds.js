'use strict';

var util = require('util');

var Feeds = function(client) {
    this.client = client;
};

Feeds.prototype.url = function(format) {
    var params = arguments.slice(1).map(function(param) {
        return encodeURIComponent(param);
    });

    return util.format.apply(this, [format].concat(params));
};

Feeds.prototype.list = function() {
    return this.client.get("/feeds");
};

Feeds.prototype.view = function(id) {
    return this.client.get(this.url("/feeds/%s", id));
};

Feeds.prototype.log = function(id) {
    return this.client.get(this.url("/feeds/%s/log", id));
};

Feeds.prototype.location = function(id) {
    return this.client.get(this.url("/feeds/%s/location", id));
};

Feeds.prototype.updateLocation = function(id, params) {
    return this.client.put(this.url("/feeds/%s/location", id), null, params);
};

Feeds.prototype.streams = function(id) {
    return this.client.get(this.url("/feeds/%s/streams", id));
};

Feeds.prototype.stream = function(id, name) {
    return this.client.get(this.url("/feeds/%s/streams/%s", id, name));
};

Feeds.prototype.streamValues = function(id, name) {
    return this.client.get(this.url("/feeds/%s/streams/%s/values", id, name));
};

Feeds.prototype.updateStream = function(id, name, params) {
    return this.client.put(this.url("/feeds/%s/streams/%s", id, name), null, params);
};

Feeds.prototype.deleteStream = function(id, name) {
    return this.client.del(this.url("/feeds/%s/streams/%s", id, name));
};

Feeds.prototype.keys = function(id) {
    return this.client.get("/keys", { feed: id });
};

Feeds.prototype.createKey = function() {
    // TODO
};

Feeds.prototype.updateKey = function() {
    // TODO
};

module.exports = Feeds;
