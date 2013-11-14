Node.js M2X API Client
======================

The AT&T M2X API provides all the needed operations to connect your device to AT&T's [M2X](http://m2x.att.com) service. 
This client provides an easy to use interface for [node.js](http://nodejs.org/).


## Installation

m2x-nodejs is available as an npm package. Install the latest version with:

    npm install m2x


## Getting Started

1. Signup for an [M2X Account](https://m2x.att.com/signup).
2. Obtain your _Master Key_ from the Master Keys tab of your [Account Settings](https://m2x.att.com/account) screen.
3. Create your first [Data Source Blueprint](https://m2x.att.com/blueprints) and copy its _Feed ID_.
4. Review the [M2X API Documentation](https://m2x.att.com/developer/documentation/overview).

Please consult the [M2X glossary](https://m2x.att.com/developer/documentation/glossary) if you have questions about any M2X specific terms.


## Example Usage

In order to be able to use this client you will need an AT&T M2X API key and a Data Source ID. If you don't have an API key, create an account and, once registered and with your account activated, create a new Data Source Blueprint, and copy the Feed ID and API Key values. The following script will send your CPU load average to three different streams named load_1m, load_5m and load_15. Check that there's no need to create a stream in order to write values into it:

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
                if (res.statusCode !== 204) {
                    // abort if something went wrong
                    clearInterval(this.updateInterval);
                }
            }.bind(this));
        });
    };
    
    var instance = new UptimeDataSource();

You can find the script in [`examples/m2x-uptime.js`](examples/m2x-uptime.js).


## License

This gem is delivered under the MIT license. See [LICENSE](LICENSE) for the terms.


## Acknowledgements

This client is a direct port of Leandro Lopez' [AT&T M2X client for Ruby](https://github.com/attm2x/m2x-ruby) so all the credit should go to him.