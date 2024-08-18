import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface Customer{
    id?:string;
    customer_name:string;
    phone_number:string;
    specialist_id:number;
    appointment_start_date:string;
    appointment_end_date:string;
    job:string;
    status:string;
    PaymentInput:string;
}

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customer_name: string;

  @Column()
  phone_number: string;

  @Column()
  specialist_id: number;

  @Column()
  appointment_start_date: string;

  @Column()
  appointment_end_date: string;

  @Column()
  job: string;

  @Column()
  status: string;

  @Column()
  PaymentInput: string;
}
