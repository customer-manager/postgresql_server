"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
class AuthService {
    async create(user) {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.UserEntity);
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        const userEntity = userRepository.create({
            ...user,
            password: hashedPassword
        });
        await userRepository.save(userEntity);
        return userEntity;
    }
    async findByUsername(username) {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.UserEntity);
        const user = await userRepository.findOne({ where: { username } });
        return user ? user : null;
    }
    async findById(id) {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.UserEntity);
        const user = await userRepository.findOne({ where: { id: id } });
        return user ? user : null;
    }
    async validatePassword(user, password) {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.UserEntity);
        return await bcryptjs_1.default.compare(password, user.password);
    }
    async saveRefreshToken(userId, refreshToken) {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.UserEntity);
        await userRepository.update(userId, { refreshToken });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map