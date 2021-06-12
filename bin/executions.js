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
    consola_1.default.start('Semantic Version Upgrade Process Started');
    try {
        const currentVersion = PackageServices_1.getCurrentVersion(packFilePath);
        const upgradedVersion = Misc_1.toUpgradedVersion(currentVersion, upgradeOption);
        consola_1.default.info(`Upgrading from ${Misc_1.toVersionString(currentVersion)} -> ${Misc_1.toVersionString(upgradedVersion)}`);
        PackageServices_1.createBackupPackJson(packFilePath);
        PackageServices_1.setNewVersion(packFilePath, upgradedVersion);
        consola_1.default.success(`Finished Semantic Version Upgrade Process`);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            consola_1.default.error('Semantic Version Upgrade Process failed:', `Cannot find file ${packFilePath}`);
        }
        else {
            consola_1.default.error('Semantic Version Upgrade Process failed with Unknown Error:\n', error);
        }
    }
};
const rollBackSemanticVersion = (packFilePath) => {
    consola_1.default.start('Semantic Version Rollback Process Started');
    const currentVersion = PackageServices_1.getCurrentVersion(packFilePath);
    const rollbackedVersion = PackageServices_1.getCurrentVersion(Misc_1.getBackupPath(packFilePath));
    PackageServices_1.restoreBackupPackJson(packFilePath);
    consola_1.default.success(`Rollbacked from ${Misc_1.toVersionString(currentVersion)} -> ${Misc_1.toVersionString(rollbackedVersion)}`);
};
const execute = (sourcePath, packFilePath, upgradeOption) => {
    const packFileRelativePath = Misc_1.toRelativePath(packFilePath);
    upgradeSemanticVersion(packFileRelativePath, upgradeOption);
    rollBackSemanticVersion(packFileRelativePath);
    PackageServices_1.clearBackupPackJson(packFileRelativePath);
    console.log(sourcePath, packFileRelativePath, upgradeOption);
};
exports.execute = execute;
