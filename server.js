"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var errorhandler_1 = __importDefault(require("errorhandler"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
exports.app = express_1.default();
var PORT = process.env.PORT || 1234;
exports.app.use(morgan_1.default("dev"));
exports.app.use(cors_1.default({
    origin: "http://localhost:1234",
    credentials: true,
}));
if (process.env.NODE_ENV === "production") {
    exports.app.use(express_1.default.static("dist"));
}
exports.app.use(errorhandler_1.default());
exports.app.listen(PORT, function () { return console.log("Server now listening at port: " + PORT); });
