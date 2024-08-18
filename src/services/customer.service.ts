import { getConnectionManager, getRepository, Repository } from 'typeorm';
import { CustomerEntity } from '../models/customer.model'; // Güncellenmiş model yolunu kullanın
import { Customer } from '../models/customer.model';
import { AppDataSource } from '../database/postgresql/database';

export class CustomerService {
  private customerRepository: Repository<CustomerEntity>;

  constructor(){
    this.customerRepository=AppDataSource.getRepository(CustomerEntity);
  }

  private toLowerCaseString(str: string): string {
    return str.toLowerCase();
  }

  async create(customer: Customer): Promise<Customer> {
    const customerData = { ...customer, customer_name: this.toLowerCaseString(customer.customer_name) };
    const customerEntity = this.customerRepository.create(customerData);
    await this.customerRepository.save(customerEntity);
    return customerEntity;
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findById(id: string): Promise<Customer | null> {
    return await this.customerRepository.findOne({where:{id:id}}) || null;
  }

  async search(name: string): Promise<Customer[]> {
    const lowerCaseName = this.toLowerCaseString(name);
    return await this.customerRepository
      .createQueryBuilder('customer')
      .where('LOWER(customer.customer_name) LIKE :name', { name: `%${lowerCaseName}%` })
      .getMany();
  }

  async update(id: string, customer: Partial<Customer>): Promise<Customer | null> {
    await this.customerRepository.update(id, {
      ...customer,
      customer_name: customer.customer_name ? this.toLowerCaseString(customer.customer_name) : undefined
    });
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
