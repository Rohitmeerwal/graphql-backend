"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
exports.authResolver = {
    Query: {
        login: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email });
            if (!user)
                throw new Error('Invalid credentials');
            const isMatch = yield (0, auth_1.comparePassword)(password, user.password);
            if (!isMatch)
                throw new Error('Invalid credentials');
            const token = (0, auth_1.generateToken)(user.id);
            return { token };
        })
    },
    Mutation: {
        register: (_, { username, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const userExists = yield User_1.default.findOne({ email });
            if (userExists)
                throw new Error('User already exists');
            const hashedPassword = yield (0, auth_1.hashPassword)(password);
            const user = new User_1.default({
                username,
                email,
                password: hashedPassword,
            });
            yield user.save();
            const token = (0, auth_1.generateToken)(user.id);
            return { token };
        }),
        logout: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            return { message: 'Logged out successfully' };
        })
    }
};
