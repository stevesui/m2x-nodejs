#!/usr/bin/env node

//
// See https://github.com/attm2x/m2x-nodejs/blob/master/README.md#example-usage
// for instructions
//

var M2X = require("m2x");
var exec = require("child_process").exec;

var API_KEY = "<YOUR-FEED-API-KEY>";
var FEED    = "<YOUR-FEED-ID>";

// Match `uptime` load averages output for both Linux and OSX
var UPTIME_RE = new RegExp("(\\d+\\.\\d+),? (\\d+\\.\\d+),? (\\d+\\.\\d+)$", "m");


function UptimeDataSource() {
    this.m2xClient = new M2X(API_KEY);

    // Create the streams if they don't exist
    this.loadAvg(function(load_1m, load_5m, load_15m) {
        this.m2xClient.feeds.updateStream(FEED, "load_1m", { value: load_1m });
        this.m2xClient.feeds.updateStream(FEED, "load_5m", { value: load_5m });
        this.m2xClient.feeds.updateStream(FEED, "load_15m", { value: load_15m });
    });

    this.updateInterval = setInterval(this.update.bind(this), 1000);
};

UptimeDataSource.prototype.loadAvg = function(cb) {
    var self = this;

    exec("uptime", function(error, stdout, stderr) {
        var match = stdout.match(UPTIME_RE);

        if (match) {
            cb.call(self, match[1], match[2], match[3]);
        }
    });
};

UptimeDataSource.prototype.update = function() {
    this.loadAvg(function(load_1m, load_5m, load_15m) {
        // Write the different values into AT&T M2X
        var values = {
            load_1m:  [ { value: load_1m } ],
            load_5m:  [ { value: load_5m } ],
            load_15m: [ { value: load_15m } ]
        };

        this.m2xClient.feeds.postMultiple(FEED, values, function(data, error, res) {
            if (error || res.statusCode !== 204) {
                // abort if something went wrong
                clearInterval(this.updateInterval);

                if (error) {
                    console.log(error);
                }
            }
        }.bind(this));
    });
};

var instance = new UptimeDataSource();
