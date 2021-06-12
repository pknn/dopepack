"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrElse = exports.getOr = void 0;
function getOr(defaultValue) {
    return (maybe) => maybe || defaultValue;
}
exports.getOr = getOr;
const getOrElse = (maybe, defaultValue) => getOr(defaultValue)(maybe);
exports.getOrElse = getOrElse;
