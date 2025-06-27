import { Request, Response } from 'express';
import { Custumer } from './custumer.entity.js';
import { CustumerMongoRepository } from './custumer.mongodb.repository.js';
import { CustumerPostgresRepository } from './custumer.postgres.repository.js';


const custumerRepository = new CustumerMongoRepository();
//const custumerRepository = new CustumerPostgresRepository();

export class CustumerController {

    async findAllCustumers(req: Request, res: Response) {
        const custumers = await custumerRepository.findAll();
        res.json(custumers);
    }

    async findCustumerById(req: Request, res: Response) {
        const custumerId = req.params.id;
        const custumer = await custumerRepository.findOne(custumerId);
        if (!custumer) {
            res.status(404).json({
                errorMessage: 'Custumer not found',
                errorCode: 'CHARACTER_NOT_FOUND'
            });
            return;
        }
        res.json({ data: custumer });
    }

    async addCustumer(req: Request, res: Response) {

        const input = req.body;
        const newCustumer = new Custumer(
            input.name,
            input.lastname,
            input.cellphone,
            input.email
        );

        await custumerRepository.add(newCustumer);

        res.status(201).json({ data: newCustumer });

    }

    updateCustumer(req: Request, res: Response) {
        // Logic to update an existing custumer
    }

    deleteCustumer(req: Request, res: Response) {
        // Logic to delete a custumer
    }




}