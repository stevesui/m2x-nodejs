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
* 
*/

var M2X = require("../");
var m2x_client = new M2X("<M2X-API-KEY>");
var device_id = "<M2X-DEVICE-ID>";

m2x_client.devices.listTriggers(device_id,function(response) {
    if (response.isSuccess()) {
        console.log(JSON.stringify(response.json));
        console.log("---*----*----");
        console.log(JSON.stringify(response.json.triggers));
    } 
    else {
        console.log(JSON.stringify(response.error()));
    }
});
