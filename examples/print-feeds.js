#!/usr/bin/env node

//
// This is a simple application that requests the list
// of feeds available for the provided API Key and then
// prints the details for each of those feeds
//

var M2X = require("m2x");
var API_KEY = "43a42001fa169295a0c272c9e358e0b4";

function M2XFeeds() {
    this.m2x = new M2X(API_KEY);

    this.getFeeds();
};

M2XFeeds.prototype.getFeeds = function(callback) {
    this.m2x.feeds.list(function(data) {
        data.feeds.forEach(function(feed) {
            console.log(feed);
        });
    });
};

var instance = new M2XFeeds()
