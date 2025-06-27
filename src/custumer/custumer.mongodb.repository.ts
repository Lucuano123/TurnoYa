import { CustumerRepository } from "./custumer.repository.interface.js";
import { Custumer } from "./custumer.entity.js";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/';
const mongoCustumer = new MongoClient(uri);
const db = mongoCustumer.db(process.env.MONGODB_DB || 'custumers');
const custumers = db.collection<Custumer>('custumers');

export class CustumerMongoRepository implements CustumerRepository {

    constructor() {
        mongoCustumer.connect();
    }

    async findAll(): Promise<Custumer[] | undefined> {
        return await custumers.find().toArray();
    }

    async findOne(id: string): Promise<Custumer | undefined> {
        const objectId = new ObjectId(id);
        return (await custumers.findOne({ _id: objectId })) || undefined;
    }

    async add(custumer: Custumer): Promise<Custumer | undefined> {
        const id = (await custumers.insertOne(custumer)).insertedId
        let resultCustumer = await custumers.findOne({ _id: id })
        return resultCustumer || undefined
    }

    async update(id: string, custumer: Custumer): Promise<Custumer | undefined> {
        const objectId = new ObjectId(id)
        return (await custumers.findOneAndUpdate({ _id: objectId }, { $set: custumer }, { returnDocument: 'after' })) || undefined
    }

    async partialUpdate(id: string, updates: Partial<Custumer>): Promise<Custumer | undefined> {
        const objectId = new ObjectId(id)
        return (await custumers.findOneAndUpdate(
            { _id: objectId },
            { $set: updates },
            { returnDocument: 'after' }
        )) || undefined
    }

    async delete(id: string): Promise<Custumer | undefined> {
        const objectId = new ObjectId(id)
        return (await custumers.findOneAndDelete({ _id: objectId })) || undefined
    }
}