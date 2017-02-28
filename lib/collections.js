/**
 * Created by ska on 9/14/15.
 */
"use strict";

var helpers = require("./helpers");
var Collections;
/**
 * @module Collections
 * @description Method for [Wrapper for AT&T M2X Collections API]{@link https://m2x.att.com/developer/documentation/v2/collections} endpoint.
 * @param client {str}
 * @constructor
 */
Collections = function(client) {
  this.client = client;
};

/**
 * @memberOf Collections
 * @description Method for [List Collections]{@link https://m2x.att.com/developer/documentation/v2/collections#List-collections} endpoint.
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Collections list
 */
Collections.prototype.list = function(params, callback) {
  if (typeof params === "function") {
    callback = params;
    params = {};
  }
  return this.client.get("/collections", { qs: params || {} }, callback);
};

/**
 * @memberOf Collections
 * @description Method for [Create Collection]{@link https://m2x.att.com/developer/documentation/v2/collections#Create-Collection} endpoint.
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns Collection details
 */
Collections.prototype.create = function(params, callback) {
  return this.client.post("/collections", {
    headers: { "Content-Type": "application/json" },
    params: params
  }, callback);
};

/**
 * @memberOf Collections
 * @description Method for [Update Collection Details]{@link https://m2x.att.com/developer/documentation/v2/collections#Update-Collection-Details} endpoint.
 * @param id ID of the Collection to update
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Collections.prototype.update = function(id, params, callback) {
  return this.client.put(helpers.url("/collections/%s", id), {
    headers: { "Content-Type": "application/json" },
    params: params
  }, callback);
};

/**
 * @memberOf Collections
 * @description Method for [View Collection Details]{@link https://m2x.att.com/developer/documentation/v2/collections#View-Collection-Details} endpoint.
 * @param id {str} ID of the Collection to view
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Collections.prototype.view = function(id, callback) {
  return this.client.get(helpers.url("/collections/%s", id), callback);
};

/**
 * @memberOf Collections
 * @description Method for [Add device to collection]{@link https://m2x.att.com/developer/documentation/v2/collections#Add-device-to-collection} endpoint.
 * @param id {str} ID of the Collection to add device
 * @param deviceId {str} ID of the Device to add
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Collections.prototype.addDevice = function(id, deviceId, callback) {
  return this.client.put(helpers.url("/collections/%s/devices/%s", id, deviceId), {
    headers: { "Content-Type": "application/json" }
  }, callback);
};

/**
 * @memberOf Collections
 * @description Method for [Remove device from collection]{@link https://m2x.att.com/developer/documentation/v2/collections#Remove-device-from-collection} endpoint.
 * @param id {str} ID of the Collection to remove device
 * @param deviceId {str} ID of the Device to remove
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Collections.prototype.removeDevice = function(id, deviceId, callback) {
  return this.client.del(helpers.url("/collections/%s/devices/%s", id, deviceId), {
    headers: { "Content-Type": "application/json" }
  }, callback);
};

/**
 * @memberOf Collections
 * @description Method for [Read Collection Metadata]{@link https://m2x.att.com/developer/documentation/v2/collections#Read-Collection-Metadata} endpoint.
 * Note that this method can return an empty value (response status of 204) if the collection has no metadata defined.
 * @param id {str} ID of the Collection to retrieve metadata
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Collections.prototype.metadata = function(id, callback) {
  return this.client.get(helpers.url("/collections/%s/metadata", id), callback);
};

/**
 * @memberOf Collections
 * @description Method for [Read Collection Metadata Field]{@link https://m2x.att.com/developer/documentation/v2/collections#Read-Collection-Metadata-Field} endpoint.
 * @param id {str} ID of the Collection to read metadata field
 * @param field {str} The metadata field to be read
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Collections.prototype.metadataField = function(id, field, callback) {
    return this.client.get(helpers.url("/collections/%s/metadata/%s", id, field), callback);
};

/**
 * @memberOf Collections
 * @description Method for [Update Collection Metadata]{@link https://m2x.att.com/developer/documentation/v2/collections#Update-Collection-Metadata} endpoint.
 * @param id {str} ID of the Collection to update metadata
 * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Collections.prototype.updateMetadata = function(id, params, callback) {
  return this.client.put(
    helpers.url("/collections/%s/metadata", id),
    { params: params },
    callback
  );
};

/**
 * @memberOf Collections
 * @description Method for [Update Collection Metadata Field]{@link https://m2x.att.com/developer/documentation/v2/collections#Update-Collection-Metadata-Field} endpoint.
 * @param id {str} ID of the Collection to update metadata field
 * @param field {str} The metadata field to be updated
 * @param value {str} The value to update
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Collections.prototype.updateMetadataField = function(id, field, value, callback) {
    return this.client.put(
      helpers.url("/collections/%s/metadata/%s", id, field),
      { params: { value: value } },
      callback
    );
};

/**
 * @memberOf Collections
 * @description Method for [Delete Collection]{@link https://m2x.att.com/developer/documentation/v2/collections#Delete-Collection} endpoint.
 * @param id {str} ID of the Collection to delete
 * @param callback {function} Response callback
 * @returns HttpResponse The API response, see M2X API docs for details
 */
Collections.prototype.deleteCollection = function(id, callback) {
  return this.client.del(helpers.url("/collections/%s", id), callback);
};

module.exports = Collections;
