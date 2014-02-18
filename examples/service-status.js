#!/usr/bin/env node

//
// This is a simple application that requests the current
// M2X service status and prints it to the console
//

var M2X = require("m2x");
var API_KEY = "<YOUR-API-KEY>";

function M2XStatus() {
    this.m2x = new M2X(API_KEY);

    this.m2x.status(function(data) {
        console.log("Current status of M2X service: " + data.status);
    });
};

var instance = new M2XStatus()
