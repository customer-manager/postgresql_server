import { getRepository, Repository } from 'typeorm';
import { CustomerEntity } from '../models/customer.model'; // Güncellenmiş model yolunu kullanın
import { Customer } from '../models/customer.model';

export class CustomerService {
  private customerRepository: Repository<CustomerEntity>;

  private toLowerCaseString(str: string): string {
    return str.toLowerCase();
  }

  async create(customer: Customer): Promise<Customer> {
    const customerRepository = getRepository(CustomerEntity);
    const customerData = { ...customer, customer_name: this.toLowerCaseString(customer.customer_name) };
    const customerEntity = customerRepository.create(customerData);
    await customerRepository.save(customerEntity);
    return customerEntity;
  }

  async findAll(): Promise<Customer[]> {
    const customerRepository = getRepository(CustomerEntity);
    return await customerRepository.find();
  }

  async findById(id: string): Promise<Customer | null> {
    const customerRepository = getRepository(CustomerEntity);
    return await customerRepository.findOne({where:{id:id}}) || null;
  }

  async search(name: string): Promise<Customer[]> {
    const customerRepository = getRepository(CustomerEntity);
    const lowerCaseName = this.toLowerCaseString(name);
    return await customerRepository
      .createQueryBuilder('customer')
      .where('LOWER(customer.customer_name) LIKE :name', { name: `%${lowerCaseName}%` })
      .getMany();
  }

  async update(id: string, customer: Partial<Customer>): Promise<Customer | null> {
    const customerRepository = getRepository(CustomerEntity);
    await customerRepository.update(id, {
      ...customer,
      customer_name: customer.customer_name ? this.toLowerCaseString(customer.customer_name) : undefined
    });
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const customerRepository = getRepository(CustomerEntity);
    await customerRepository.delete(id);
  }
}
