"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const typeorm_1 = require("typeorm");
const customer_model_1 = require("../models/customer.model"); // Güncellenmiş model yolunu kullanın
class CustomerService {
    toLowerCaseString(str) {
        return str.toLowerCase();
    }
    async create(customer) {
        const customerRepository = (0, typeorm_1.getRepository)(customer_model_1.CustomerEntity);
        const customerData = { ...customer, customer_name: this.toLowerCaseString(customer.customer_name) };
        const customerEntity = customerRepository.create(customerData);
        await customerRepository.save(customerEntity);
        return customerEntity;
    }
    async findAll() {
        const customerRepository = (0, typeorm_1.getRepository)(customer_model_1.CustomerEntity);
        return await customerRepository.find();
    }
    async findById(id) {
        const customerRepository = (0, typeorm_1.getRepository)(customer_model_1.CustomerEntity);
        return await customerRepository.findOne({ where: { id: id } }) || null;
    }
    async search(name) {
        const customerRepository = (0, typeorm_1.getRepository)(customer_model_1.CustomerEntity);
        const lowerCaseName = this.toLowerCaseString(name);
        return await customerRepository
            .createQueryBuilder('customer')
            .where('LOWER(customer.customer_name) LIKE :name', { name: `%${lowerCaseName}%` })
            .getMany();
    }
    async update(id, customer) {
        const customerRepository = (0, typeorm_1.getRepository)(customer_model_1.CustomerEntity);
        await customerRepository.update(id, {
            ...customer,
            customer_name: customer.customer_name ? this.toLowerCaseString(customer.customer_name) : undefined
        });
        return this.findById(id);
    }
    async delete(id) {
        const customerRepository = (0, typeorm_1.getRepository)(customer_model_1.CustomerEntity);
        await customerRepository.delete(id);
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map