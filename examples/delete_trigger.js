#!/usr/bin/env node

/*
* This example demonstrates how to make a call to the List Devices endpoint.
* and then prints the details of each device.
*
* API Documentation:
* https://m2x.att.com/developer/documentation/v2/device#List-Devices
* 
* Setup:
* Replace <M2X-API-KEY> with an M2X API Key
* Replace <M2X-DEVICE-ID> with an M2X Device Id
* Replace <M2X-TRIGGER-ID> with M2X Device Trigger Id
* 
*/

var M2X = require("../");
var m2x_client = new M2X("<M2X-API-KEY>");
var device_id = "<M2X-DEVICE-ID>";
var trigger_id = "<M2X-TRIGGER-ID>";

m2x_client.devices.deleteTriggers(device_id, trigger_id, function(response) {
    if (response.isSuccess()) {
        console.log(JSON.stringify(response));
        console.log("---*----*----");
        console.log(JSON.stringify(response)); 
    } 
    else {
        console.log(JSON.stringify(response.error())); }
});
