"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("../../models/user.model");
const customer_model_1 = require("../../models/customer.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    url: `${process.env.POSTGRES_URL}`,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [user_model_1.UserEntity, customer_model_1.CustomerEntity],
    synchronize: false,
});
//# sourceMappingURL=database.js.map