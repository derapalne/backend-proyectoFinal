"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT || 7777,
    secret: process.env.SECRET,
};
