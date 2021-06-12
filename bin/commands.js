"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommand = void 0;
const commander_1 = require("commander");
const CommandOptions_1 = require("./models/CommandOptions");
const getCommand = () => {
    const command = new commander_1.Command('dopepub');
    command.addOption(new commander_1.Option('-s, --src <source_dir>', 'built source to publish').default('dist', 'dist/ directory'));
    command.addOption(new commander_1.Option('-u, --upgrade <options>', 'version upgrading strategy')
        .choices([...CommandOptions_1.UpgradeOptions])
        .makeOptionMandatory());
    command.addOption(new commander_1.Option('-p, --package <package.json>', 'override package.json location').default('package.json'));
    command.addOption(new commander_1.Option('-o, --override <version>', 'override version'));
    return command.parse();
};
exports.getCommand = getCommand;
