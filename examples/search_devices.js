#!/usr/bin/env node

/*

 This example demonstrates use the Search Devices endpoint
 to search your M2X devices

 https://m2x.att.com/developer/documentation/v2/device#Search-Devices

*/

var M2X = require("m2x");

var m2x = new M2X("<M2X-API-KEY>");

device_serial = "123abc";
device_id = "";

params = {
    serial: device_serial
};

m2x.devices.search(params, function(response) {
    if (response.isSuccess()) {
        devices = response.json.devices;
        for (var device_index in devices) {
            device = devices[device_index];
            if (device.serial == device_serial) {
                device_id = device.id;
                console.log("Device found. Device ID: ".concat(device_id));
            }
        }
    } else {
        console.log(JSON.stringify(response.error()));
    }
});
