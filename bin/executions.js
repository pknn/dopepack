"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const consola_1 = __importDefault(require("consola"));
const Misc_1 = require("./helpers/Misc");
const PackageServices_1 = require("./services/PackageServices");
const PublishService_1 = require("./services/PublishService");
const upgradeSemanticVersion = (packFilePath, upgradeOption) => {
    consola_1.default.start('Semantic version upgrade process started');
    const packFileRelativePath = Misc_1.toRelativePath(packFilePath);
    try {
        const currentVersion = PackageServices_1.getCurrentVersion(packFileRelativePath);
        const upgradedVersion = Misc_1.toUpgradedVersion(currentVersion, upgradeOption);
        consola_1.default.info(`Upgrading from ${Misc_1.toVersionString(currentVersion)} -> ${Misc_1.toVersionString(upgradedVersion)}`);
        PackageServices_1.createBackupPackJson(packFileRelativePath);
        PackageServices_1.setNewVersion(packFileRelativePath, upgradedVersion);
        consola_1.default.success(`Finished Semantic version upgrade process`);
        if (upgradeOption === 'dry') {
            consola_1.default.info('CLI was run with "dry" option, will not continue with publication process');
            PackageServices_1.clearBackupPackJson(packFileRelativePath);
            process.exit(0);
        }
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            consola_1.default.error('Semantic version upgrade process failed:', `Cannot find file ${packFileRelativePath}`);
        }
        else {
            consola_1.default.error('Semantic version upgrade process failed with Unknown Error:\n', error);
        }
    }
};
const rollBackSemanticVersion = (packFilePath) => {
    consola_1.default.start('Semantic Version Rollback Process Started');
    const packFileRelativePath = Misc_1.toRelativePath(packFilePath);
    const currentVersion = PackageServices_1.getCurrentVersion(packFileRelativePath);
    const rollbackedVersion = PackageServices_1.getCurrentVersion(Misc_1.getBackupPath(packFileRelativePath));
    PackageServices_1.restoreBackupPackJson(packFileRelativePath);
    consola_1.default.success(`Rollbacked from ${Misc_1.toVersionString(currentVersion)} -> ${Misc_1.toVersionString(rollbackedVersion)}`);
};
const publishPackage = (sourcePath, packFilePath) => {
    consola_1.default.start('NPM Registry publication process');
    const packFileRelativePath = Misc_1.toRelativePath(packFilePath);
    try {
        consola_1.default.info('Creating temporary directory for publication');
        PublishService_1.createTempDirectory(sourcePath, packFilePath);
        consola_1.default.info('Attempting to publish package');
        PublishService_1.attemptPublish();
        consola_1.default.success('Finished NPM Registry publication process');
    }
    catch (error) {
        consola_1.default.error('Package publication failed:', error);
        consola_1.default.info('Rolling back version');
        rollBackSemanticVersion(packFilePath);
    }
    finally {
        consola_1.default.info('Clearing package backup');
        PackageServices_1.clearBackupPackJson(packFileRelativePath);
        consola_1.default.info('Clearing temporary directory');
        PublishService_1.clearTempDirectory();
    }
};
const execute = (sourcePath, packFilePath, upgradeOption) => {
    upgradeSemanticVersion(packFilePath, upgradeOption);
    publishPackage(sourcePath, packFilePath);
};
exports.execute = execute;
