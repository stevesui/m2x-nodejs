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
//var m2x_client = new M2X("<M2X-API-KEY>");
var m2x_client = new M2X("36f265c21169a943f4025a49ca3a1f42");
var device_id = "1328f3bad183c004282fade0b1e59cfd";

m2x_client.devices.listTriggers(device_id,function(response) {
    if (response.isSuccess()) {
        console.log(JSON.stringify(response.json));
        console.log("---*----*----");
        console.log(JSON.stringify(response.json.triggers));


    //     response.json.devices.forEach(function(device) {
    //         console.log(device);
    //     });
    } 
    else {
        console.log(JSON.stringify(response.error()));
    }
});
