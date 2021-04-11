"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Startup_1 = __importDefault(require("./Startup"));
const config_1 = __importDefault(require("../config/"));
Startup_1.default.Server.listen(config_1.default.express.port, () => Startup_1.default.Log.success(config_1.default.express.message));
//# sourceMappingURL=Server.js.map