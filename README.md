# Node.js M2X API Client #

The AT&T M2X API provides all the needed operations to connect your device to AT&T's [M2X](http://m2x.att.com) service. 
This client provides an easy to use interface for [node.js](http://nodejs.org/).


## Getting Started ##

1. Signup for an [M2X Account](https://m2x.att.com/signup).
2. Obtain your _Master Key_ from the Master Keys tab of your [Account Settings](https://m2x.att.com/account) screen.
3. Create your first [Data Source Blueprint](https://m2x.att.com/blueprints) and copy its _Feed ID_.
4. Review the [M2X API Documentation](https://m2x.att.com/developer/documentation/overview).

Please consult the [M2X glossary](https://m2x.att.com/developer/documentation/glossary) if you have questions about any M2X specific terms.


## Installation

m2x-nodejs is available as an npm package. Install the latest version with:

    npm install m2x


## Usage ##

### M2X Class ###

M2X is the main class that you will be using to communicate with the remote API. In order to create an M2X object you are going to need an API key, which can be either a Master Key or a key belonging to a specific feed (in which case you will only be allowed to read/write to this feed).

An M2X object provides methods for communicating with the remote API. Methods are organized under the following modules: `batches`, `blueprints`, `datasources`, `feeds` and `keys`.

The following is a short example on how to instantiate an M2X object:

```javascript
var M2X = require("m2x");

var m2x = new M2X("<API-KEY>");
```

The M2X object also provides a simple method for checking the API status (so if you are having connectivity issues, you can check whether the API is currently down):

```javascript
m2x.status(function(status) {
    console.log(status);
});
```

### Batches ###

The `batches` object provides methods for communicating with the M2X Batches API. As it is with every other method provided by this library, they will all require at least one parameter which is the callback function.

This is the full list of methods the `batches` object provides:

* m2x.batches.list(callback)

  List all the batches that belong to the user associated with the M2X API key supplied when initializing M2X.

* m2x.batches.search(params, callback)

  List/search all the data source batches that belong to the user
  associated with the M2X API key supplied when initializing M2X
  
  The list of data source batches can be filtered by using one or
  more of the following optional parameters:
  
  * `q` text to search, matching the name and description.
  * `tags` a comma separated list of tags.
  * `limit` how many results per page.
  * `page` the specific results page, starting by 1.
  * `latitude` and `longitude` for searching feeds geographically.
  * `distance` numeric value in `distance_unit`.
  * `distance_unit` either `miles`, `mi` or `km`.

* m2x.batches.view(id, callback)

  Retrieve information about an existing data source batch

* m2x.batches.create(params, callback)

  Create a new data source batch
  
  Accepts the following parameters as members of a hash:
  
  * `name` the name of the new data source.
  * `visibility` either "public" or "private".
  * `description` containing a longer description (optional).
  * `tags` a comma separated string of tags (optional).

* m2x.batches.update(params, callback)

  Update an existing data source batch details
  
  Accepts the following parameters as members of a hash:
  
  * `name` the name of the new data source.
  * `visibility` either "public" or "private".
  * `description` containing a longer description (optional).
  * `tags` a comma separated string of tags (optional).

* m2x.batches.datasources(id, params, callback)

  List/search all data sources in the batch
  
  See Datasources#search for search parameters description.

* m2x.batches.addDatasource(id, serial, callback)

  Add a new data source to an existing batch
  
  Accepts a `serial` parameter, that must be a unique identifier
  within this batch.

* m2x.batches.del(id, callback)

  Delete an existing data source batch

### Blueprints ###

The `blueprints` object provides methods for communicating with the M2X Blueprints API. As it is with every other method provided by this library, they will all require at least one parameter which is the callback function.

This is the full list of methods the `blueprints` object provides:

* m2x.blueprints.list(callback)

  List all the blueprints that belong to the user associated with the M2X API key supplied when initializing M2X.

* m2x.blueprints.search(params, callback)

  List/search all the blueprints that belong to the user associated
  with the M2X API key supplied when initializing M2X
  
  The list of blueprints can be filtered by using one or more of the
  following optional parameters:
  
  * `q` text to search, matching the name and description.
  * `tags` a comma separated list of tags.
  * `limit` how many results per page.
  * `page` the specific results page, starting by 1.
  * `latitude` and `longitude` for searching feeds geographically.
  * `distance` numeric value in `distance_unit`.
  * `distance_unit` either `miles`, `mi` or `km`.

* m2x.blueprints.view(id, callback)

  Retrieve information about an existing data source blueprint

* m2x.blueprints.create(params, callback)

  Create a new data source blueprint
  
  Accepts the following parameters as members of a hash:
  
  * `name` the name of the new data source blueprint.
  * `visibility` either "public" or "private".
  * `description` containing a longer description (optional).
  * `tags` a comma separated string of tags (optional).

* m2x.blueprints.update(id, params, callback)

  Update an existing data source blueprint's information
  
  Accepts the following parameters as members of a hash:
  
  * `name` the name of the new data source blueprint.
  * `visibility` either "public" or "private".
  * `description` containing a longer description (optional).
  * `tags` a comma separated string of tags (optional).

* m2x.blueprints.del(id, callback)

  Delete an existing data source blueprint

### Datasources ###

The `datasources` object provides methods for communicating with the M2X Datasouces API. As it is with every other method provided by this library, they will all require at least one parameter which is the callback function.

This is the full list of methods the `datasources` object provides:

* m2x.datasources.list(callback)

  List all the datasources that belong to the user associated with the M2X API key supplied when initializing M2X.

* m2x.datasources.search(params, callback)

  List/search all the datasources that belong to the user associated
  with the M2X API key supplied when initializing M2X
  
  The list of data sources can be filtered by using one or more of the
  following optional parameters:
  
  * `q` text to search, matching the name and description.
  * `tags` a comma separated list of tags.
  * `limit` how many results per page.
  * `page` the specific results page, starting by 1.
  * `latitude` and `longitude` for searching feeds geographically.
  * `distance` numeric value in `distance_unit`.
  * `distance_unit` either `miles`, `mi` or `km`.

* m2x.datasources.view(id, callback)

  Retrieve information about an existing data source

* m2x.datasources.create(params, callback)

  Create a new data source
  
  Accepts the following parameters as members of a hash:
  
  * `name` the name of the new data source.
  * `visibility` either "public" or "private".
  * `description` containing a longer description (optional).
  * `tags` a comma separated string of tags (optional).

* m2x.datasources.update(id, params, callback)

  Update an existing data source details
 
  Accepts the following parameters as members of a hash:
 
  * `name` the name of the new data source.
  * `visibility` either "public" or "private".
  * `description` containing a longer description (optional).
  * `tags` a comma separated string of tags (optional).

* m2x.datasources.del(id, callback)

  Delete an existing data source

### Feeds ###

The `feeds` object provides methods for communicating with the M2X Feed API. As it is with every other method provided by this library, they will all require at least one parameter which is the callback function.

This is the full list of methods the `feeds` object provides:

* m2x.feeds.list(callback)

  List all the feeds that belong to the user associated with the M2X API key supplied when initializing M2X.

* m2x.feeds.search(params, callback)

  List/search all the feeds that belong to the user associated
  with the M2X API key supplied when initializing M2X.

  The list of feeds can be filtered by using one or more of the
  following optional parameters:

  * `q` text to search, matching the name and description.
  * `type` one of `bleuprint`, `batch` and `datasource`.
  * `tags` a comma separated list of tags.
  * `limit` how many results per page.
  * `page` the specific results page, starting by 1.
  * `latitude` and `longitude` for searching feeds geographically.
  * `distance` numeric value in `distance_unit`.
  * `distance_unit` either `miles`, `mi` or `km`.

* m2x.feeds.view(id, callback)

  Return the details of the supplied feed.

* m2x.feeds.log(id, callback)

  Return a list of access log to the supplied feed.

* m2x.feeds.location(id, callback)

  Return the current location of the supplied feed.

  Note that this method can return an empty value (response status of 204) if the feed has no location defined.

* m2x.feeds.updateLocation(id, params, callback)

  Update the current location of the feed.

* m2x.feeds.streams(id, callback)

  Return a list of the associated streams for the supplied feed

* m2x.feeds.stream(id, name, callback)

  Return a list of the associated streams for the supplied feed

* m2x.feeds.streamValues(id, name, params, cb)

  List values from an existing data stream associated with a
  specific feed, sorted in reverse chronological order (most
  recent values first).
  
  The values can be filtered by using one or more of the following
  optional parameters:
  
  * `start` An ISO 8601 timestamp specifying the start of the date range to be considered.
  * `end` An ISO 8601 timestamp specifying the end of the date range to be considered.
  * `limit` Maximum number of values to return.

* m2x.feeds.updateStream(id, name, params, callback)

  Update stream's properties.

  If the stream doesn't exist it will create it. See https://m2x.att.com/developer/documentation/feed#Create-Update-Data-Stream for details.

* m2x.feeds.deleteStream(id, name, callback)

  Delete the stream (and all its values) from the feed

* m2x.feeds.keys(id, callback)

  Returns a list of API keys associated with the feed

* m2x.feeds.createKey(id, params, callback)

  Creates a new API key associated to the feed

  If a parameter named `stream` is supplied with a stream name, it will create an API key associated with that stream only.

* m2x.feeds.updateKey(id, key, params, callback)

  Updates the properties of an API key.

* m2x.feeds.postMultiple(id, values, callback)

  Post multiple values to multiple streams

  This method allows posting multiple values to multiple streams
  belonging to a feed. All the streams should be created before
  posting values using this method. The `values` parameters is a
  hash with the following format:

  ```javascript
  {
      "stream-name-1": [
          { "at": <Time in ISO8601>, "value": x },
          { "value": y }
      ],
      "stream-name-2": [ ... ]
  }
  ```

  If the `at` attribute is missing then the current time of the server, in UTC, will be used.

* m2x.feeds.triggers(id, callback)

  Retrieve list of triggers associated with the specified feed.

* m2x.feeds.trigger(id, triggerID, callback)

  Get details of a specific trigger associated with an existing feed.

* m2x.feeds.createTrigger(id, params, callback)

  Create a new trigger associated with the specified feed.

* m2x.feeds.updateTrigger(id, triggerID, params, callback)

  Update an existing trigger associated with the specified feed.

* m2x.feeds.testTrigger(id, triggerName, callback)

  Test the specified trigger by firing it with a fake value.
  This method can be used by developers of client applications
  to test the way their apps receive and handle M2X notifications.

* m2x.feeds.deleteTrigger(id, triggerID, callback)

  Delete an existing trigger associated with a specific feed.

### Keys ###

The `keys` object provides methods for communicating with the M2X Keys API. As it is with every other method provided by this library, they will all require at least one parameter which is the callback function.

This is the full list of methods the `keys` object provides:

* m2x.keys.list(callback)

  List all the Master API Keys that belong to the user associated with the AT&T M2X API key supplied when initializing the M2X object.

* m2x.keys.view(key, callback)

  Return the details of the API Key supplied.

* m2x.keys.del(key, callback)

  Delete the supplied API Key.

* m2x.keys.create(params, callback)

  Create a new API Key.
 
  Note that, according to the parameters sent, you can create a Master API Key or a Feed/Stream API Key. See https://m2x.att.com/developer/documentation/keys#Create-Key for details on the parameters accepted by this method.

* m2x.keys.update(key, params, callback)

  Update API Key properties.
 
  This method accepts the same parameters as create API Key and has the same validations. Note that the Key token cannot be updated through this method.

* m2x.keys.regenerate(key, callback)

  Regenerate an API Key token.
 
  Note that if you regenerate the key that you're using for authentication then you would need to change your scripts to start using the new key token for all subsequent requests.


## Example ##

In order to be able to use this client you will need an AT&T M2X API key and a Data Source ID. If you don't have an API key, create an account and, once registered and with your account activated, create a new Data Source Blueprint, and copy the Feed ID and API Key values. The following script will send your CPU load average to three different streams named load_1m, load_5m and load_15. Check that there's no need to create a stream in order to write values into it:

```javascript
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
```

You can find the script in [`examples/uptime.js`](examples/uptime.js), and some other examples in the same directory.


## License ##

This gem is delivered under the MIT license. See [LICENSE](LICENSE) for the terms.


## Acknowledgements ##

This client is a direct port of Leandro Lopez' [AT&T M2X client for Ruby](https://github.com/attm2x/m2x-ruby) so all the credit should go to him.
