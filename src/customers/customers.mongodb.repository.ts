/*import { CustomerRepository } from "./customers.repository.interface.js";
import { Customer } from "./customers.entity.js";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/';
const mongoCustomer = new MongoClient(uri);
const db = mongoCustomer.db(process.env.MONGODB_DB || 'customers');
const customers = db.collection<Customer>('customers');

export class CustomerMongoRepository implements CustomerRepository {

    constructor() {
        mongoCustomer.connect();
    }

    async findAll(): Promise<Customer[] | undefined> {
        return await customers.find().toArray();
    }

    async findOne(id: string): Promise<Customer | undefined> {
        const objectId = new ObjectId(id);
        return (await customers.findOne({ _id: objectId })) || undefined;
    }

    async add(customer: Customer): Promise<Customer | undefined> {
        const id = (await customers.insertOne(customer)).insertedId
        let resultCustomer = await customers.findOne({ _id: id })
        return resultCustomer || undefined
    }

    async update(id: string, customer: Customer): Promise<Customer | undefined> {
        const objectId = new ObjectId(id)
        return (await customers.findOneAndUpdate({ _id: objectId }, { $set: customer }, { returnDocument: 'after' })) || undefined
    }

    async partialUpdate(id: string, updates: Partial<Customer>): Promise<Customer | undefined> {
        const objectId = new ObjectId(id)
        return (await customers.findOneAndUpdate(
            { _id: objectId },
            { $set: updates },
            { returnDocument: 'after' }
        )) || undefined
    }

    async delete(id: string): Promise<Customer | undefined> {
        const objectId = new ObjectId(id)
        return (await customers.findOneAndDelete({ _id: objectId })) || undefined
    }
}*/
