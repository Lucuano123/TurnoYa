import { AppointmentRepository } from "./appointment.repository.interface.js";
import { Appointment } from "./appointment.entity.js";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/';
const mongoCustumer = new MongoClient(uri);
const db = mongoCustumer.db(process.env.MONGODB_DB || 'appointments');
const appointments = db.collection<Appointment>('appointments');

export class AppointmentMongoRepository implements AppointmentRepository {

    constructor() {
        mongoCustumer.connect();
    }

    async findAll(): Promise<Appointment[] | undefined> {
        return await appointments.find().toArray();
    }

    async findOne(id: string): Promise<Appointment | undefined> {
        const objectId = new ObjectId(id);
        return (await appointments.findOne({ _id: objectId })) || undefined;
    }

    async add(appointment: Appointment): Promise<Appointment | undefined> {
        const id = (await appointments.insertOne(appointment)).insertedId
        let resultAppointment = await appointments.findOne({ _id: id })
        return resultAppointment || undefined
    }

    async update(id: string, appointment: Appointment): Promise<Appointment | undefined> {
        const objectId = new ObjectId(id)
        return (await appointments.findOneAndUpdate({ _id: objectId }, { $set: appointment }, { returnDocument: 'after' })) || undefined
    }

    async partialUpdate(id: string, updates: Partial<Appointment>): Promise<Appointment | undefined> {
        const objectId = new ObjectId(id)
        return (await appointments.findOneAndUpdate(
            { _id: objectId },
            { $set: updates },
            { returnDocument: 'after' }
        )) || undefined
    }

    async delete(id: string): Promise<Appointment | undefined> {
        const objectId = new ObjectId(id)
        return (await appointments.findOneAndDelete({ _id: objectId })) || undefined
    }
}