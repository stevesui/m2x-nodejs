"use strict";

var helpers = require("./helpers");
var Devices;

/**
 * @module Devices
 * @description Method for [Wrapper for AT&T M2X Device API]{@link https://m2x.att.com/developer/documentation/device} endpoint.
 * @param client {object}
 * @param keysAPI {str}
 * @constructor
 */
Devices = function(client, keysAPI) {
    this.client = client;
    this.keysAPI = keysAPI;
};

/**
 * @memberOf Devices
 * @description Method for [List/search Public Devices Catalog]{@link https://m2x.att.com/developer/documentation/v2/device#List-Public-Devices-Catalog} endpoint.
 * This allows unauthenticated users to search Devices from other users that have been marked as public, allowing them to read public Device metadata, locations, streams list, and view each Devices' stream metadata and its values.
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Devices list
 */
Devices.prototype.catalog = function(params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }
    return this.client.get("/devices/catalog", { qs: params || {} }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [List Devices]{@link https://m2x.att.com/developer/documentation/v2/device#List-Devices} endpoint.
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Devices list
 */
Devices.prototype.list = function(params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }
    return this.client.get("/devices", { qs: params || {} }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Search Devices]{@link https://m2x.att.com/developer/documentation/v2/device#Search-Devices} endpoint.
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Devices list
 */
Devices.prototype.search = function(params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }
    return this.client.get("/devices/search", {
        headers: { "Content-Type": "application/json" },
        params:  params,
    }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [List Devices Tags]{@link https://m2x.att.com/developer/documentation/v2/device#List-Device-Tags} endpoint.
 * @param callback {function} Response callback
 * @returns Devices list
 */
Devices.prototype.tags = function(callback) {
    return this.client.get("/devices/tags", callback);
};

/**
 * @memberOf Devices
 * @description Method for [Create Device]{@link https://m2x.att.com/developer/documentation/v2/device#Create-Device} endpoint.
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Device details
 */
Devices.prototype.create = function(params, callback) {
    return this.client.post("/devices", {
        headers: { "Content-Type": "application/json" },
        params: params
    }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Update Device Details]{@link https://m2x.att.com/developer/documentation/v2/device#Update-Device-Details} endpoint.
 * @param id {str} ID of the Device to update
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.update = function(id, params, callback) {
    return this.client.put(helpers.url("/devices/%s", id), {
        headers: { "Content-Type": "application/json" },
        params: params
    }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [View Device Details]{@link https://m2x.att.com/developer/documentation/v2/device#View-Device-Details} endpoint.
 * @param id {str} ID of the Device to retrieve
 * @param callback {function} Response callback
 * @returns Device details
 */
Devices.prototype.view = function(id, callback) {
    return this.client.get(helpers.url("/devices/%s", id), callback);
};

/**
 * @memberOf Devices
 * @description Method for [Read Device Location]{@link https://m2x.att.com/developer/documentation/v2/device#Read-Device-Location} endpoint.
 * Note that this method can return an empty value (response status of 204) if the device has no location defined.
 * @param id {str} ID of the Device to retrieve location details
 * @param callback {function} Response callback
 * @returns Location details
 */
Devices.prototype.location = function(id, callback) {
    return this.client.get(helpers.url("/devices/%s/location", id), callback);
};

/**
 * @memberOf Devices
 * @description Method for [Read Device Location History]{@link https://m2x.att.com/developer/documentation/v2/device#Read-Device-Location-History} endpoint.
 * @param id {str}  ID of the Device to retrieve location history
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Location details list
 */
Devices.prototype.locationHistory = function(id, params, callback) {
    return this.client.get(helpers.url("/devices/%s/location/waypoints", id), { qs: params }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Update Device Location]{@link https://m2x.att.com/developer/documentation/v2/device#Update-Device-Location} endpoint.
 * @param id {str} ID of the Device to update location details
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.updateLocation = function(id, params, callback) {
    return this.client.put(
        helpers.url("/devices/%s/location", id),
        { params: params },
        callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [Delete Location History]{@link https://m2x.att.com/developer/documentation/v2/device#Delete-Location-History} endpoint.
 * @param id {str} ID of the Device to remove location history
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.deleteLocationHistory = function(id, params, callback) {
    return this.client.del(
        helpers.url("/devices/%s/location/waypoints", id),
	{ params: params },
	callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [Read Device Detadata]{@link https://m2x.att.com/developer/documentation/v2/device#Read-Device-Metadata} endpoint.
 * @param id {str} ID of the Device to read device metadata
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.metadata = function(id, callback) {
    return this.client.get(helpers.url("/devices/%s/metadata", id), callback);
};

/**
 * @memberOf Devices
 * @description Method for [Read Device Metadata Field]{@link https://m2x.att.com/developer/documentation/v2/device#Read-Device-Metadata-Field} endpoint.
 * @param id {str} ID of the Device to read device metadata
 * @param field {str} The metadata field to be read
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.metadataField = function(id, field, callback) {
    return this.client.get(helpers.url("/devices/%s/metadata/%s", id, field), callback);
};

/**
 * @memberOf Devices
 * @description Method for [Update Device Metadata]{@link https://m2x.att.com/developer/documentation/v2/device#Update-Device-Metadata} endpoint.
 * @param id {str} ID of the Device to update device metadata
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.updateMetadata = function(id, params, callback) {
    return this.client.put(
      helpers.url("/devices/%s/metadata", id),
      { params: params },
      callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [Update Device Metadata Field]{@link https://m2x.att.com/developer/documentation/v2/device#Update-Device-Metadata-Field} endpoint.
 * @param id {str} ID of the Device to update device metadata
 * @param field {str} The metadata field to be updated
 * @param value {str} The value to update
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.updateMetadataField = function(id, field, value, callback) {
    return this.client.put(
      helpers.url("/devices/%s/metadata/%s", id, field),
      { params: { value: value } },
      callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [List Data Streams]{@link https://m2x.att.com/developer/documentation/v2/device#List-Data-Streams} endpoint.
 * @param id {str} ID of the Device to retrieve list of the associated streams
 * @param callback {function} Response callback
 * @returns Data streams list
 */
Devices.prototype.streams = function(id, callback) {
    return this.client.get(helpers.url("/devices/%s/streams", id), callback);
};

/**
 * @memberOf Devices
 * @description Method for [Create Update Data Stream]{@link https://m2x.att.com/developer/documentation/v2/device#Create-Update-Data-Stream} endpoint.
 * If the stream doesn't exist it will create it.
 * @param id {str} ID of the Device to update stream's properties
 * @param name {str} Name of the stream to be updated
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.updateStream = function(id, name, params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    return this.client.put(
        helpers.url("/devices/%s/streams/%s", id, name),
        { params: params },
        callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [Create Update Data Stream]{@link https://m2x.att.com/developer/documentation/v2/device#Create-Update-Data-Stream} endpoint.
 * If the stream doesn't exist it will create it.
 * @param id {str} ID of the Device to update stream's properties
 * @param name {Array} Name of the streams to be updated
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.updateStreams = function(id, names, params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    var self = this;
    var updateNext = function(index, responses) {
        var name = names[index];

        self.updateStream(id, name, params, function(response) {
            responses[name] = response;

            if (response.isError() || index === 0) {
                callback(response, responses);
            } else {
                updateNext(index - 1, responses);
            }
        });
    };

    updateNext(names.length - 1, {});
};

/**
 * @memberOf Devices
 * @description Method for [Update Data Stream Value]{@link https://m2x.att.com/developer/documentation/v2/device#Update-Data-Stream-Value} endpoint.
 * @param id {str} ID of the Device to set the stream value
 * @param name {str} Name of the stream to be set
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.setStreamValue = function(id, name, params, callback) {
    return this.client.put(
        helpers.url("/devices/%s/streams/%s/value", id, name),
        { params: params },
        callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [View Data Stream]{@link https://m2x.att.com/developer/documentation/v2/device#View-Data-Stream} endpoint.
 * @param id {str} ID of the Device to get the stream details
 * @param name {str} Name of the stream to retrieve
 * @param callback {function} Response callback
 * @returns Data Stream details
 */
Devices.prototype.stream = function(id, name, callback) {
    return this.client.get(
        helpers.url("/devices/%s/streams/%s", id, name),
        callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [List Data Stream Values]{@link https://m2x.att.com/developer/documentation/v2/device#List-Data-Stream-Values} endpoint.
 * @param id {str} ID of the Device
 * @param name {str} Name of the stream to retrieve
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Data Stream list
 */
Devices.prototype.streamValues = function(id, name, params, callback) {
    var url = helpers.url("/devices/%s/streams/%s/values", id, name);

    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    return this.client.get(url, { qs: params }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [List Values from all Data Streams of a Device]{@link https://m2x.att.com/developer/documentation/v2/device#List-Values-from-all-Data-Streams-of-a-Device} endpoint.
 * @param id {str} ID of the Device
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Data stream list
 */
Devices.prototype.values = function(id, params, callback) {
    var url = helpers.url("/devices/%s/values", id);

    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    return this.client.get(url, { qs: params }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Export Values from all Data Streams of a Device]{@link https://m2x.att.com/developer/documentation/v2/device#Export-Values-from-all-Data-Streams-of-a-Device} endpoint.
 * @param id {str} ID of the Device
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.valuesExport = function(id, params, callback) {
    var url = helpers.url("/devices/%s/values/export.csv", id);

    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    return this.client.get(url, { qs: params }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Search Values from all Data Streams of a Device]{@link https://m2x.att.com/developer/documentation/v2/device#Search-Values-from-all-Data-Streams-of-a-Device} endpoint.
 * @param id {str} ID of the Device
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Data stream list in JSON format
 */
Devices.prototype.valuesSearch = function(id, params, callback) {
    return this.client.get(
        helpers.url("/devices/%s/values/search", id),
        {
            headers: { "Content-Type": "application/json" },
            params:  params
        },
        callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [Data Stream Sampling]{@link https://m2x.att.com/developer/documentation/v2/device#Data-Stream-Sampling} endpoint.
 * @param id {str} ID of the Device
 * @param name {str} Name of the stream to retrieve
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.sampleStreamValues = function(id, name, params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }
    return this.client.get(
        helpers.url("/devices/%s/streams/%s/sampling", id, name),
        { qs: params },
        callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [Data Stream Stats]{@link https://m2x.att.com/developer/documentation/v2/device#Data-Stream-Stats} endpoint.
 * @param id {str} ID of the Device
 * @param name {str} Name of the stream to retrieve
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.streamStats = function(id, name, params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }
    return this.client.get(
        helpers.url("/devices/%s/streams/%s/stats", id, name),
        { qs: params },
        callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [Post Data Stream Values]{@link https://m2x.att.com/developer/documentation/v2/device#Post-Data-Stream-Values} endpoint.
 * @param id {str} ID of the Device
 * @param name {str} Name of the existing stream
 * @param values {str} The value to update
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.postValues = function(id, name, values, callback) {
    return this.client.post(
        helpers.url("/devices/%s/streams/%s/values", id, name),
        { params: { values: values } },
        callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [Delete Data Stream Values]{@link https://m2x.att.com/developer/documentation/v2/device#Delete-Data-Stream-Values} endpoint.
 * @param id {str} ID of the Device
 * @param name {str} Name of the existing stream to delete values
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.deleteStreamValues = function(id, name, params, callback) {
    return this.client.del(
        helpers.url("/devices/%s/streams/%s/values", id, name),
        { params: params },
        callback
    );
};

/**
 * @memberOf Devices
 * @description Method for [Delete Data Stream]{@link https://m2x.att.com/developer/documentation/v2/device#Delete-Data-Stream} endpoint.
 * @param id {str} ID of the Device
 * @param name {str} Name of the existing stream to be deleted
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.deleteStream = function(id, name, callback) {
    return this.client.del(helpers.url("/devices/%s/streams/%s", id, name), callback);
};

/**
 * @memberOf Devices
 * @description Method for [Post Device Updates(Multiple Values to Multiple Streams)]{@link https://m2x.att.com/developer/documentation/v2/device#Post-Device-Updates--Multiple-Values-to-Multiple-Streams-} endpoint.
 * @param id {str} ID of the Device
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.postUpdates = function(id, params, callback) {
    return this.client.post(helpers.url("/devices/%s/updates", id), {
        headers: { "Content-Type": "application/json" },
        params:  params
    }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Post Device Update(Single Value to Multiple Streams)]{@link https://m2x.att.com/developer/documentation/v2/device#Post-Device-Update--Single-Values-to-Multiple-Streams-} endpoint.
 * @param id {str} ID of the Device
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.postUpdate = function(id, params, callback) {
    return this.client.post(helpers.url("/devices/%s/update", id), {
        headers: { "Content-Type": "application/json" },
        params:  params
    }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [View Request Log]{@link https://m2x.att.com/developer/documentation/v2/device#View-Request-Log} endpoint.
 * @param id {str} ID of the Device
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.log = function(id, callback) {
    return this.client.get(helpers.url("/devices/%s/log", id), callback);
};

/**
 * @memberOf Devices
 * @description Method for [Device's List of Received Commands]{@link https://m2x.att.com/developer/documentation/v2/commands#Device-s-List-of-Received-Commands} endpoint.
 * @param id {str} ID of the Device to get list of received commands
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Commands list
 */
Devices.prototype.commands = function(id, params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    return this.client.get(helpers.url("/devices/%s/commands", id), { qs: params || {} }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Device's View of Command Details]{@link https://m2x.att.com/developer/documentation/v2/commands#Device-s-View-of-Command-Details} endpoint.
 * @param id {str} ID of the Device
 * @param commandId {str} ID of the Command to retrieve
 * @param callback {function} Response callback
 * @returns Command details
 */
Devices.prototype.command = function(id, commandId, callback) {
    return this.client.get(
        helpers.url("/devices/%s/commands/%s", id, commandId),
        callback);
};

/**
 * @memberOf Devices
 * @description Method for [Device Marks a Command as Processed]{@link https://m2x.att.com/developer/documentation/v2/commands#Device-Marks-a-Command-as-Processed} endpoint.
 * @param id {str} ID of the Device
 * @param commandId {str} ID of the Command to retrieve
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.processCommand = function(id, commandId, params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    return this.client.post(
        helpers.url("/devices/%s/commands/%s/process", id, commandId), {
        headers: { "Content-Type": "application/json" },
        params:  params
    }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Device Marks a Command as Rejected]{@link https://m2x.att.com/developer/documentation/v2/commands#Device-Marks-a-Command-as-Rejected} endpoint.
 * @param id {str} ID of the Device
 * @param commandId {str} ID of the Command to retrieve
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.rejectCommand = function(id, commandId, params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }

    return this.client.post(
        helpers.url("/devices/%s/commands/%s/reject", id, commandId), {
        headers: { "Content-Type": "application/json" },
        params:  params
    }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Delete Device]{@link https://m2x.att.com/developer/documentation/v2/device#Delete-Device} endpoint.
 * @param id {str} ID of the Device to be deleted
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.deleteDevice = function(id, callback) {
  return this.client.del(helpers.url("/devices/%s", id), callback);
};

/**
 * @memberOf Devices
 * @description Method for [List Keys]{@link https://m2x.att.com/developer/documentation/v2/keys#List-Keys} endpoint.
 * @param id {str} ID of the Device to return a list of API keys
 * @param callback {function} Response callback
 * @returns Keys list
 */
Devices.prototype.keys = function(id, callback) {
    return this.client.get("/keys", { qs: { device: id } }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Create Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Create-Key} endpoint.
 * If a parameter named `stream` is supplied with a stream name, it will create an API key associated with that stream only.
 * @param id {str} ID of the Device to creates a new API key
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 */
Devices.prototype.createKey = function(id, params, callback) {
    this.keysAPI.create(helpers.extend(params, { device: id }), callback);
};

/**
 * @memberOf Devices
 * @description Method for [Update Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Update-Key} endpoint.
 * @param id {str} ID of the Device to update API key
 * @param key {str} API key to be updated
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 */
Devices.prototype.updateKey = function(id, key, params, callback) {
    this.keysAPI.update(key, helpers.extend(params, { device: id }), callback);
};

/**
 * @memberOf Devices
 * @description Method for [List all Triggers of a Device ]{@link https://m2x.att.com/developer/documentation/v2/triggers} endpoint.
 * @param id {str} ID of the Device to read device metadata
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.listTriggers = function(id, callback) {
    return this.client.get(helpers.url("/devices/%s/triggers", id), callback);
};

/**
 * @memberOf Devices
 * @description Method for [Create Triggers for a Device (Single Value to Multiple Streams)]{@link https://m2x.att.com/developer/documentation/v2/device#Post-Device-Update--Single-Values-to-Multiple-Streams-} endpoint.
 * @param id {str} ID of the Device
 * @param params {object} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.createTriggers = function(id, params, callback) {
    return this.client.post(helpers.url("/devices/%s/triggers", id), {
        headers: { "Content-Type": "application/json" },
        params:  params
    }, callback);
};

/**
 * @memberOf Devices
 * @description Method for [Delete Triggers of a  Device]{@link https://m2x.att.com/developer/documentation/v2/triggers} endpoint.
 * @param id {str} ID of the Device to read device metadata
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Devices.prototype.deleteTriggers = function(id, triggerId, callback) {
    return this.client.del(helpers.url("/devices/%s/triggers/%s", id, triggerId), callback);
};

module.exports = Devices;
