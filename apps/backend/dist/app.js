"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dbConnect_1 = __importDefault(require("./db/dbConnect"));
const prisma_1 = __importDefault(require("./db/prisma"));
const app = (0, express_1.default)();
(0, dbConnect_1.default)();
app.use((0, helmet_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.get('/', (request, response) => {
    response.json({ message: 'Hey! This is your server response!' });
});
app.post('/registration', async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send({
                message: 'Email and password are required',
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        response.status(201).send({
            message: 'User created successfully',
            result: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    }
    catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return response.status(400).send({
                message: 'Email already exists',
            });
        }
        next(error);
    }
});
app.post('/login', async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send({
                message: 'Email and password are required',
            });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return response.status(404).send({
                message: 'Email not found, please try again.',
            });
        }
        const passwordCheck = await bcrypt_1.default.compare(password, user.password);
        if (!passwordCheck) {
            return response.status(400).send({
                message: 'Incorrect password, please try again.',
            });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            userEmail: user.email,
        }, process.env.JWT_SECRET, { expiresIn: '24h' });
        response.status(200).send({
            message: 'Login successful!',
            email: user.email,
            token,
        });
    }
    catch (error) {
        next(error);
    }
});
app.get('/routes', async (request, response, next) => {
    try {
        const routes = await prisma_1.default.route.findMany({
            orderBy: { name: 'asc' },
        });
        response.status(200).json({
            message: 'Routes retrieved successfully',
            routes,
        });
    }
    catch (error) {
        next(error);
    }
});
app.get('/routes/:slug', async (request, response, next) => {
    try {
        const { slug } = request.params;
        const route = await prisma_1.default.route.findUnique({
            where: { slug },
        });
        if (!route) {
            return response.status(404).json({
                message: 'Route not found',
            });
        }
        response.status(200).json({
            message: 'Route retrieved successfully',
            route,
        });
    }
    catch (error) {
        next(error);
    }
});
app.use((request, response) => {
    response.status(404).json({ message: 'Route not found' });
});
app.use((error, request, response) => {
    const err = error;
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    console.error(err.stack);
    response.status(status).json({
        message,
        error: process.env.NODE_ENV === 'development' ? err : {},
    });
});
exports.default = app;
