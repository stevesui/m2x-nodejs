#!/usr/bin/env node

/*
 *
 * This example demonstrates how to add device to collection
 *
 * API Documentation:
 * https://m2x.att.com/developer/documentation/v2/distribution#Add-Device-to-an-existing-Distribution
 *
 * Setup:
 * Replace <M2X-API-KEY> with an M2X API Key
 * Replace <M2X-DISTRIBUTION-ID> with a distribution id
 * Replace <M2X-DEVICE-SERIAL> with a collection id
 * Replace <DEVICE-NAME> with a device name
 * Replace <DEVICE-DESCRIPTION> with a device description
 * Replace <DEVICE-VISIBILITY> with a device visibility
 * Replace <DEVICE-TAGS> with a device tags
 *
 */

var M2X = require("../lib/m2x");
var m2x_client = new M2X("<M2X-API-KEY>");

var distribution_id = "<M2X-DISTRIBUTION-ID>";

params = {
    serial: "<M2X-DEVICE-SERIAL>",
    name: "<DEVICE-NAME>",
    description: "<DEVICE-DESCRIPTION>",
    visibility: "<DEVICE-VISIBILITY>",
    tags: "<DEVICE-TAGS>"
};

m2x_client.distributions.addDevice(distribution_id, params, function(response) {
    if (response.isSuccess()) {
        console.log("Status Code: ".concat(response.status));
    } else {
        console.log(JSON.stringify(response.error()));
    }
});