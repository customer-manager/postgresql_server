"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const database_1 = require("../database/postgresql/database");
class AuthService {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(user_model_1.UserEntity);
    }
    async create(user) {
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        const userEntity = this.userRepository.create({
            ...user,
            password: hashedPassword
        });
        await this.userRepository.save(userEntity);
        return userEntity;
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOne({ where: { username } });
        return user ? user : null;
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        return user ? user : null;
    }
    async validatePassword(user, password) {
        return await bcryptjs_1.default.compare(password, user.password);
    }
    async saveRefreshToken(userId, refreshToken) {
        await this.userRepository.update(userId, { refreshToken });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map