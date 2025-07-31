import { Router } from "express";
import { CustomerController } from './customers.controller.js';

export const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get('/', customerController.findAllCustomers);
customerRouter.get('/:id', customerController.findCustomerById);
customerRouter.post('/', sanitizeCustomerInput, customerController.addCustomer);
customerRouter.put('/:id', sanitizeCustomerInput, customerController.updateCustomer);
customerRouter.delete('/:id', customerController.deleteCustomer);  

function sanitizeCustomerInput(req:any, res:any, next:any) {

  req.body.sanitizedInput = {
    name: req.body.name,
    customerClass: req.body.customerClass,
    level: req.body.level,
    hp: req.body.hp,
    mana: req.body.mana,
    attack: req.body.attack,
    items: req.body.items,
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

