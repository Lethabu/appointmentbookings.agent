"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiAgent_1 = require("../services/aiAgent");
const router = express_1.default.Router();
router.post('/action', (req, res) => {
    const { agent, action, payload } = req.body;
    const result = (0, aiAgent_1.performAgentAction)(agent, action, payload);
    res.json(result);
});
exports.default = router;
