#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const executions_1 = require("./executions");
function run() {
    const command = commands_1.getCommand();
    const { src, package: packFile, upgrade } = command.opts();
    executions_1.execute(src, packFile, upgrade);
}
run();
