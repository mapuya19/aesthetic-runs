"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function dbConnect() {
    try {
        await prisma_1.default.$connect();
        console.log('Successfully connected to PostgreSQL via Prisma!');
    }
    catch (error) {
        console.log('Unable to connect to database!');
        console.error(error);
        process.exit(1);
    }
}
exports.default = dbConnect;
