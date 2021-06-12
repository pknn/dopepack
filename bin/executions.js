"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const Misc_1 = require("./helpers/Misc");
const PackageServices_1 = require("./services/PackageServices");
const execute = (sourcePath, packFilePath, upgradeOption) => {
    const currentVersion = PackageServices_1.getCurrentVersion(packFilePath);
    console.log(Misc_1.toUpgradedVersion(currentVersion, upgradeOption));
    console.log(sourcePath, packFilePath, upgradeOption);
};
exports.execute = execute;
