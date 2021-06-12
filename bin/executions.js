"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const consola_1 = __importDefault(require("consola"));
const Misc_1 = require("./helpers/Misc");
const PackageServices_1 = require("./services/PackageServices");
const upgradeSemanticVersion = (packFilePath, upgradeOption) => {
    consola_1.default.start('Starting Semantic Version Upgrade Process');
    const currentVersion = PackageServices_1.getCurrentVersion(packFilePath);
    const upgradedVersion = Misc_1.toUpgradedVersion(currentVersion, upgradeOption);
    consola_1.default.info(`Upgrading from ${Misc_1.toVersionString(currentVersion)} -> ${Misc_1.toVersionString(upgradedVersion)}`);
};
const execute = (sourcePath, packFilePath, upgradeOption) => {
    const packFileRelativePath = Misc_1.toRelativePath(packFilePath);
    upgradeSemanticVersion(packFileRelativePath, upgradeOption);
    console.log(sourcePath, packFileRelativePath, upgradeOption);
};
exports.execute = execute;
