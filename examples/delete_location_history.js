#!/usr/bin/env node

/*
*
* This example demonstrates how to delete location history for a device
*
* API Documentation:
* https://m2x.att.com/developer/documentation/v2/device#Delete-Location-History
*
* Setup:
* Replace <M2X-API-KEY> with an M2X API Key
* Replace <M2X-DEVICE-ID> with a device id
*/

var M2X = require("../");
var m2x_client = new M2X("<M2X-API-KEY>");

var device_id = "<M2X-DEVICE-ID>";

var params = {
  "from": "2015-01-01T01:00:00.000Z",
  "end": "2016-01-01T01:00:00.000Z"
};

console.log("Deleting location history from: %s end: %s for device: %s", params.from, params.end, device_id);

m2x_client.devices.deleteLocationHistory(device_id, params, function(response) {
  if (response.isSuccess()) {
    console.log("Status Code: ".concat(response.status));
  } else {
    console.log(JSON.stringify(response.error()));
  }
});
