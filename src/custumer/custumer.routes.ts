import { Router } from "express";
import { CustumerController } from './custumer.controller.js';

export const custumerRouter = Router();
const custumerController = new CustumerController();

custumerRouter.get('/', custumerController.findAllCustumers);
custumerRouter.get('/:id', custumerController.findCustumerById);
custumerRouter.post('/', sanitizeCustumerInput, custumerController.addCustumer);
custumerRouter.put('/:id', sanitizeCustumerInput, custumerController.updateCustumer);
custumerRouter.delete('/:id', custumerController.deleteCustumer);  

function sanitizeCustumerInput(req:any, res:any, next:any) {

  req.body.sanitizedInput = {
    name: req.body.name,
    custumerClass: req.body.custumerClass,
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

