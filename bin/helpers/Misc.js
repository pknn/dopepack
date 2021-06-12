"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUpgradedVersion = exports.toPrettyJsonString = exports.toVersionString = exports.fromVersionString = void 0;
const Undefined_1 = require("./Undefined");
const fromVersionString = (versionString) => {
    const [major, minor, patch] = versionString.split('.').map((v) => parseInt(v));
    const getOrZero = Undefined_1.getOr(0);
    return {
        major: getOrZero(major),
        minor: getOrZero(minor),
        patch: getOrZero(patch),
    };
};
exports.fromVersionString = fromVersionString;
const toVersionString = (version) => Object.values(version)
    .map((v) => v.toString())
    .join('.');
exports.toVersionString = toVersionString;
const toPrettyJsonString = (object) => JSON.stringify(object, (_, v) => v, 2);
exports.toPrettyJsonString = toPrettyJsonString;
const updateSemanticlyByIndex = (value, currentIndex, targetIndex) => currentIndex <= targetIndex ? (currentIndex === targetIndex ? value + 1 : value) : 0;
const toUpgradedVersion = (currentVersion, option) => {
    if (option === 'dry')
        return currentVersion;
    const versionKeys = Object.keys(currentVersion).map((k) => k);
    const targetIndex = versionKeys.findIndex((k) => k === option);
    const upgradedVersion = Object.entries(currentVersion).map(([k, v], currentIndex) => [
        k,
        updateSemanticlyByIndex(v, currentIndex, targetIndex),
    ]);
    return Object.fromEntries(upgradedVersion);
};
exports.toUpgradedVersion = toUpgradedVersion;
