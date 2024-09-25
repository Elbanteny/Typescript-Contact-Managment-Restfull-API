"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/api/users", userController_1.UserController.register);
exports.publicRouter.post("/api/users/login", userController_1.UserController.login);
