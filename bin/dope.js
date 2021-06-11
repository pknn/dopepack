#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("./commands");
function exec() {
    var command = commands_1.getCommand();
    console.log(command.opts());
}
exec();
