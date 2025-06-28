"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromCache = getFromCache;
exports.setToCache = setToCache;
const cache = new Map();
function getFromCache(key) {
    return cache.get(key);
}
function setToCache(key, value) {
    cache.set(key, value);
}
