"use strict";

var helpers = require("./helpers");
var Distributions;

/**
 * @module Distributions
 * @description Method for [Wrapper for AT&T M2X Distribution API]{@link https://m2x.att.com/developer/documentation/distribution} endpoint.
 * @param client {str}
 * @constructor
 */
Distributions = function(client) {
    this.client = client;
};

/**
 * @memberOf Distributions
 * @description Method for [List Distributions]{@link https://m2x.att.com/developer/documentation/v2/distribution#List-Distributions} endpoint.
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Distributions list
 */
Distributions.prototype.list = function(params, callback) {
    if (typeof params === "function") {
        callback = params;
        params = {};
    }
    return this.client.get("/distributions", { qs: params || {} }, callback);
};

/**
 * @memberOf Distributions
 * @description Method for [Create Distribution]{@link https://m2x.att.com/developer/documentation/v2/distribution#Create-Distribution} endpoint.
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Distribution details
 */
Distributions.prototype.create = function(params, callback) {
    return this.client.post("/distributions", { params: params }, callback);
};

/**
 * @memberOf Distributions
 * @description Method for [View Distribution Details]{@link https://m2x.att.com/developer/documentation/v2/distribution#View-Distribution-Details} endpoint.
 * @param id {str} ID of the Distribution to retrieve
 * @param callback {function} Response callback
 * @returns Distribution details
 */
Distributions.prototype.view = function(id, callback) {
    return this.client.get(helpers.url("/distributions/%s", id), callback);
};

/**
 * @memberOf Distributions
 * @description Method for [Update Distribution Details]{@link https://m2x.att.com/developer/documentation/v2/distribution#Update-Distribution-Details} endpoint.
 * @param id {str} ID of the Distribution to update
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Distributions.prototype.update = function(id, params, callback) {
    return this.client.put(
        helpers.url("/distributions/%s", id),
        { params: params },
        callback
    );
};

/**
 * @memberOf Distributions
 * @description Method for [List Devices from an existing Distribution]{@link https://m2x.att.com/developer/documentation/v2/distribution#List-Devices-from-an-existing-Distribution} endpoint.
 * @param id {str} ID of the Distribution to retrieve list of devices
 * @param callback {function} Response callback
 * @returns Devices list
 */
Distributions.prototype.devices = function(id, callback) {
    return this.client.get(
        helpers.url("/distributions/%s/devices", id),
        callback
    );
};

/**
 * @memberOf Distributions
 * @description Method for [Add Device to an existing Distribution]{@link https://m2x.att.com/developer/documentation/v2/distribution#Add-Device-to-an-existing-Distribution} endpoint.
 * @param id {str} ID of the Distribution to add device
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Distributions.prototype.addDevice = function(id, params, callback) {
    return this.client.post(helpers.url("/distributions/%s/devices", id), {
        headers: { "Content-Type": "application/json" },
        params: params
    }, callback);
};

/**
 * @memberOf Distributions
 * @description Method for [Delete Distribution]{@link https://m2x.att.com/developer/documentation/v2/distribution#Delete-Distribution} endpoint.
 * @param id {str} ID of the Distribution to delete device
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Distributions.prototype.deleteDistribution = function(id, callback) {
    return this.client.del(helpers.url("/distributions/%s", id), callback);
};

/**
 * @memberOf Distributions
 * @description Method for [List Data Streams]{@link https://m2x.att.com/developer/documentation/v2/distribution#List-Data-Streams} endpoint.
 * @param id {str} ID of the Distribution to retrieve a list of data streams
 * @param callback {function} Response callback
 * @returns Data streams list
 */
Distributions.prototype.dataStreams = function(id, callback) {
    return this.client.get(
        helpers.url("/distributions/%s/streams", id),
        callback
    );
};

/**
 * @memberOf Distributions
 * @description Method for [Create/Update Data Stream]{@link https://m2x.att.com/developer/documentation/v2/distribution#Create-Update-Data-Stream} endpoint.
 * @param id {str} ID of the Distribution to create/update data streams
 * @param name {str} Name of the Data stream
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Distributions.prototype.updateDataStream = function(id, name, params, callback) {
    return this.client.put(
        helpers.url("/distributions/%s/streams/%s", id, name),
        {
            headers: { "Content-Type": "application/json" },
            params: params
        },
        callback
    );
};

/**
 * @memberOf Distributions
 * @description Method for [View Data Stream]{@link https://m2x.att.com/developer/documentation/v2/distribution#View-Data-Stream} endpoint.
 * @param id {str} ID of the Distribution to view data stream
 * @param name {str} Name of the Data stream
 * @param callback {function} Response callback
 * @returns Data stream details
 */
Distributions.prototype.dataStream = function(id, name, callback) {
    return this.client.get(
        helpers.url("/distributions/%s/streams/%s", id, name),
        callback
    );
};

/**
 * @memberOf Distributions
 * @description Method for [Delete Data Stream]{@link https://m2x.att.com/developer/documentation/v2/distribution#Delete-Data-Stream} endpoint.
 * @param id {str} ID of the Distribution to delete data stream
 * @param name {str} Name of the Data stream
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Distributions.prototype.deleteDataStream = function(id, name, callback) {
    return this.client.del(
        helpers.url("/distributions/%s/streams/%s", id, name),
        callback
    );
};

/**
 * @memberOf Distributions
 * @description Method for [Read Distribution Metadata]{@link https://m2x.att.com/developer/documentation/v2/distribution#Read-Distribution-Metadata} endpoint.
 * @param id {str} ID of the Distribution to read metadata
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Distributions.prototype.metadata = function(id, callback) {
  return this.client.get(helpers.url("/distributions/%s/metadata", id), callback);
};

/**
 * @memberOf Distributions
 * @description Method for [Read Distribution Metadata Field]{@link https://m2x.att.com/developer/documentation/v2/distribution#Read-Distribution-Metadata-Field} endpoint.
 * @param id {str} ID of the Distribution to read metadata field
 * @param field {str} Metadata field to be read
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Distributions.prototype.metadataField = function(id, field, callback) {
    return this.client.get(helpers.url("/distributions/%s/metadata/%s", id, field), callback);
};

/**
 * @memberOf Distributions
 * @description Method for [Update Distribution Metadata]{@link https://m2x.att.com/developer/documentation/v2/distribution#Update-Distribution-Metadata} endpoint.
 * @param id {str} ID of the Distribution to update metadata
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Distributions.prototype.updateMetadata = function(id, params, callback) {
  return this.client.put(
    helpers.url("/distributions/%s/metadata", id),
    { params: params },
    callback
  );
};

/**
 * @memberOf Distributions
 * @description Method for [Update Distribution Metadata Field]{@link https://m2x.att.com/developer/documentation/v2/distribution#Update-Distribution-Metadata-Field} endpoint.
 * @param id {str} ID of the Distribution to update metadata field
 * @param field {str} Metadata field to be updated
 * @param value {str} Value to be updated
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Distributions.prototype.updateMetadataField = function(id, field, value, callback) {
    return this.client.put(
      helpers.url("/distributions/%s/metadata/%s", id, field),
      { params: { value: value } },
      callback
    );
};

module.exports = Distributions;
