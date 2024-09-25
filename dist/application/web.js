"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const publicAPI_1 = require("../route/publicAPI");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
// import {apiRouter} from "../route/api";
exports.web = (0, express_1.default)();
exports.web.use(express_1.default.json());
exports.web.use(publicAPI_1.publicRouter);
// web.use(apiRouter);
exports.web.use(errorMiddleware_1.errorMiddleware);
