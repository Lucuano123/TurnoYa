import { Customer } from "./customers.entity.js";

export interface CustomerRepository {
    findAll(): Promise<Customer[] | undefined>;
    findOne(id: string): Promise<Customer | undefined>;
    add(customer: Customer): Promise<Customer | undefined>;
    update(id: string, customer: Customer): Promise<Customer | undefined>;
    partialUpdate(id: string, updates: Partial<Customer>): Promise<Customer | undefined>;
    delete(id: string): Promise<Customer | undefined>;
    findPendingUsers(): Promise<Customer[] | undefined>;
    findById(id: number): Promise<Customer | null>;
}
