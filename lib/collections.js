/**
 * Created by ska on 9/14/15.
 */
"use strict";

var helpers = require("./helpers");
var Collections;

// Wrapper for AT&T M2X Device API
//
// https://m2x.att.com/developer/documentation/device
Collections = function(client) {
  this.client = client;
};

// Retrieve the list of collections accessible by the authenticated API key that
// meet the search criteria
//
// https://m2x.att.com/developer/documentation/v2/collections#List-collections
Collections.prototype.list = function(params, callback) {
  if (typeof params === "function") {
    callback = params;
    params = {};
  }
  return this.client.get("/collections", { qs: params || {} }, callback);
};

// Create a new collection
//
// https://m2x.att.com/developer/documentation/v2/device#Create-Collection
Collections.prototype.create = function(params, callback) {
  return this.client.post("/collections", {
    headers: { "Content-Type": "application/json" },
    params: params
  }, callback);
};

// Update a collection
//
// https://m2x.att.com/developer/documentation/v2/collections#Update-Collection-Details
Collections.prototype.update = function(id, params, callback) {
  return this.client.put(helpers.url("/collections/%s", id), {
    headers: { "Content-Type": "application/json" },
    params: params
  }, callback);
};

// Return the details of the supplied collection
//
// https://m2x.att.com/developer/documentation/v2/collections#View-Collection-Details
Collections.prototype.view = function(id, callback) {
  return this.client.get(helpers.url("/collections/%s", id), callback);
};

// Return the metadata of the supplied collection
//
// Note that this method can return an empty value (response status
// of 204) if the device has no metadata defined.
//
// https://m2x.att.com/developer/documentation/v2/collections#Read-Collection-Metadata
Collections.prototype.metadata = function(id, callback) {
  return this.client.get(helpers.url("/collections/%s/metadata", id), callback);
};

// Update the metadata of the collection
//
// https://m2x.att.com/developer/documentation/v2/collections#Update-Collection-Metadata
Collections.prototype.updateMetadata = function(id, params, callback) {
  return this.client.put(
    helpers.url("/devices/%s/metadata", id),
    { params: params },
    callback
  );
};

// Delete an existing collection
//
// https://m2x.att.com/developer/documentation/v2/collections#Delete-Collection
Collections.prototype.deleteCollection = function(id, callback) {
  return this.client.del(helpers.url("/collections/%s", id), callback);
};

module.exports = Collections;
