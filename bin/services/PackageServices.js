"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNewVersion = exports.getCurrentVersion = void 0;
const fs_1 = __importDefault(require("fs"));
const Misc_1 = require("../helpers/Misc");
const getPackJson = (packFilePath) => {
    const packFile = fs_1.default.readFileSync(packFilePath, {
        encoding: 'utf8',
    });
    return JSON.parse(packFile);
};
const getCurrentVersion = (packFilePath) => {
    const packJson = getPackJson(packFilePath);
    return Misc_1.fromVersionString(packJson.version);
};
exports.getCurrentVersion = getCurrentVersion;
const setNewVersion = (packFilePath, newVersion) => {
    const packJson = getPackJson(packFilePath);
    const newVersionString = Misc_1.toVersionString(newVersion);
    packJson.version = newVersionString;
    fs_1.default.writeFileSync(packFilePath, Misc_1.toPrettyJsonString(packJson));
};
exports.setNewVersion = setNewVersion;
