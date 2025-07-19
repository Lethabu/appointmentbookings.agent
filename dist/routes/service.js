"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cache_1 = require("../utils/cache");
const router = express_1.default.Router();
router.get('/services', (req, res) => {
    const cached = (0, cache_1.getFromCache)('services');
    if (cached)
        return res.json(cached);
    // Fetch from DB or source
    const services = [ /* ... */];
    (0, cache_1.setToCache)('services', services);
    res.json(services);
});
exports.default = router;
