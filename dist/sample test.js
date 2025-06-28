"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Health Check', () => {
    it('should return 401 without API key', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/reminder/some-route');
        expect(res.statusCode).toBe(401);
    });
});
