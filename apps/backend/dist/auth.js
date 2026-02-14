"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("./db/prisma"));
async function auth(request, response, next) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            response.status(401).json({
                error: new Error('No token provided!'),
            });
            return;
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await prisma_1.default.user.findUnique({
            where: { id: decodedToken.userId },
            select: { id: true, email: true },
        });
        if (!user) {
            response.status(401).json({
                error: new Error('User not found!'),
            });
            return;
        }
        request.user = user;
        next();
    }
    catch {
        response.status(401).json({
            error: new Error('Invalid request!'),
        });
    }
}
