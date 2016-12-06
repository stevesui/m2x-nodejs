#!/usr/bin/env node

/*
 * This example demonstrates how to make a call export the stream values.
 * and wait till the job state is complete by calling view job result endpoint.
 *
 * API Documentation:
 * https://m2x.att.com/developer/documentation/v2/device#Export-Values-from-all-Data-Streams-of-a-Device
 * https://m2x.att.com/developer/documentation/v2/jobs#View-Job-Results
 *
 * Setup:
 * Replace <M2X-API-KEY> with an M2X API Key
 * Replace <DEVICE-ID> with a device id
 * Replace <STREAMS> with the streams separated by comma
 *
 */

var M2X = require("../");

var m2x_client = new M2X("<M2X-API-KEY>");
var device_id = "<DEVICE-ID>";
var stream_values = "<STREAMS>";

var params = {};
if (stream_values != ""){
    params = {
        "streams": stream_values
    };
}

m2x_client.devices.valuesExport(device_id, params, function(response) {
    if (response.isSuccess()) {
        var location = response['headers']['location'];
        console.log("The job location is in:", location);
        var job_id = location.split('/').reverse()[0];
        console.log("Processing job ...")
        setTimeout(function () {
            m2x_client.jobs.view(job_id, function (response) {
                if (response.isSuccess()) {
                    if (JSON.parse(response.raw).result) {
                        console.log("The job has been completed! You can download the result from " + JSON.parse(response.raw).result.url);
                    }
                } else {
                    console.log("Error Job Location Status Code: ".concat(response.status));
                    console.log(JSON.stringify(response.error()));
                }
            });
        }, 8000);
    } else {
        console.log(response)
        console.log(JSON.stringify(response.error()));
    }
});