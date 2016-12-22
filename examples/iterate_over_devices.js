#!/usr/bin/env node

/*
 * This example demonstrates how to make a call to the List Devices endpoint.
 * and how to iterate over the paginated list of devices that is returned by the API.
 *
 * API Documentation:
 * https://m2x.att.com/developer/documentation/v2/device#List-Devices
 *
 * Setup:
 * Replace <M2X-API-KEY> with an M2X API Key
 *
 */

var M2X = require("../lib/m2x");

var m2x_client = new M2X("<M2X-API-KEY>");

var params = {
    "limit": 5 //Variable to limit the number of devices per page.
}

m2x_client.devices.list(params, function(response) {
    if (response.isSuccess()) {

        var number_of_pages = response.json['pages'];
        var total_devices = response.json['total'];
        var limit = response.json['limit'];
        console.log("Total Number of Devices: ", total_devices);
        print_devices(number_of_pages, limit);

    } else {
        console.log(JSON.stringify(response.error()));
    }
});

function print_devices(number_of_pages, limit) {
    for(var page = 1; page <= number_of_pages; page++) {
        var params = {
            "page": page,
            "limit": limit
        };

        m2x_client.devices.list(params, function (response) {
            if (response.isSuccess()) {
                var i=1;
                response.json.devices.forEach(function (device) {
                    console.log("Page",response.json['current_page'], ", Device ",i++ ," :: ", device.name)
                });
                console.log(response.json.devices.length, "Devices returned on page", response.json['current_page']);
            } else {
                console.log(JSON.stringify(response.error()));
            }
        });
    }
}

