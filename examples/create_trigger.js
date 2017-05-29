#!/usr/bin/env node

/*
*
* This example demonstrates how to create a trigger for a Device
* 
*
* API Documentation:
* https://m2x.att.com/developer/documentation/v2/device#Create-Device
*
* Setup:
* Replace <M2X-API-KEY> with an M2X API Key
* Replace <M2X-DEVICE-ID> WITH an M2X device Id
* Replace <M2X-DEVICE-STREAM-ID> WITH a M2X device stream Id
* Replace <YOUR-TRIGGER-NAME> WITH your own trigger name
*
*/

var M2X = require("../");
var m2x_client = new M2X("<M2X-API-KEY>");
var device_id = "<M2X-DEVICE-ID>";

trigger_params = { 

    name: "<YOUR-TRIGGER-NAME>",
    conditions: {
    "<M2X-DEVICE-STREAM-ID>": { gt: 30, reset : 28}
  },
  frequency: "continuous",
  callback_url: "<YOUR CALLBACK URL>",
  status: "enabled",
  send_location: true,
  notify_on_reset: false
  //custom_data: "{ foo: \"bar\" }" 
};

// // Create Device
// device_params = {
//     // name: (required)
//     name: "Device name",
//     // description: (optional)
//     description: "Device description",
//     // visibility: (required) either private or public
//     visibility: "private",
//     // tags: (optional) comma separated list of device tag names
//     tags: "",
//     // serial: (optional) alphanumeric, unique, user defined identifier for the device
//     serial: "123abc",
//     // metadata: (optional) custom user defined metadata
//     // metadata keys must begin with a lowercase letter, may contain only lowercase letters, numbers, and underscores and may be up to 250 characters long
//     // metadata values may be any string up to 5,000 characters
//     metadata: {
//        iso_country_code: "US",
//        county: "Santa Clara County",
//        city: "Palo Alto",
//        state: "CA"
//     }
// };

m2x_client.devices.createTriggers(device_id, trigger_params, function(response) {
    if (response.isSuccess()) {
        
        console.log("Trigger created.  id: " + JSON.stringify(response));


    } else {
        console.log("unsuccessful " + JSON.stringify(response));
    }
});

