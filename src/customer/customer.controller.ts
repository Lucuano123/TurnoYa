import { Request, Response } from 'express';
import { Customer } from './customer.entity.js';
import { CustomerMongoRepository } from './customer.mongodb.repository.js';
import { CustomerPostgresRepository } from './customer.postgres.repository.js';


const customerRepository = new CustomerMongoRepository();
//const customerRepository = new CustomerPostgresRepository();

export class CustomerController {

    async findAllCustomers(req: Request, res: Response) {
        const customers = await customerRepository.findAll();
        res.json(customers);
    }

    async findCustomerById(req: Request, res: Response) {
        const customerId = req.params.id;
        const customer = await customerRepository.findOne(customerId);
        if (!customer) {
            res.status(404).json({
                errorMessage: 'Customer not found',
                errorCode: 'CHARACTER_NOT_FOUND'
            });
            return;
        }
        res.json({ data: customer });
    }

    async addCustomer(req: Request, res: Response) {

        const input = req.body;
        const newCustomer = new Customer(
            input.name,
            input.lastname,
            input.cellphone,
            input.email
        );

        await customerRepository.add(newCustomer);

        res.status(201).json({ data: newCustomer });

    }

    updateCustomer(req: Request, res: Response) {
        // Logic to update an existing customer
    }

    deleteCustomer(req: Request, res: Response) {
        // Logic to delete a customer
    }




}
