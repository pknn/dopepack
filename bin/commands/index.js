"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommand = void 0;
var commander_1 = require("commander");
var CommandOptions_1 = require("../models/CommandOptions");
var getCommand = function () {
    var command = new commander_1.Command('dopepub');
    command.addOption(new commander_1.Option('-s, --src <source_dir>', 'built source to publish').default('dist', 'dist/ directory'));
    command.addOption(new commander_1.Option('-u, --upgrade <options>', 'version upgrading strategy')
        .choices(__spreadArray([], CommandOptions_1.UpgradeOptions))
        .makeOptionMandatory());
    command.addOption(new commander_1.Option('-p, --package <package.json>', 'override package.json location').default('package.json'));
    return command.parse();
};
exports.getCommand = getCommand;
