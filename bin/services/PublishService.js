"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attemptPublish = exports.clearTempDirectory = exports.createTempDirectory = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const child_process_1 = __importDefault(require("child_process"));
const Misc_1 = require("../helpers/Misc");
const createTempDirectory = (srcPath, packJsonPath) => {
    const destPath = Misc_1.toRelativePath('tmp');
    fs_extra_1.default.copySync(srcPath, destPath);
    fs_extra_1.default.copyFileSync(packJsonPath, path_1.default.join(destPath, packJsonPath));
};
exports.createTempDirectory = createTempDirectory;
const clearTempDirectory = () => {
    const destPath = Misc_1.toRelativePath('tmp');
    fs_extra_1.default.rmSync(destPath, {
        recursive: true,
        force: true,
    });
};
exports.clearTempDirectory = clearTempDirectory;
const attemptPublish = () => {
    const destPath = Misc_1.toRelativePath('tmp');
    child_process_1.default.execSync(`cd ${destPath} && yarn publish`);
};
exports.attemptPublish = attemptPublish;
