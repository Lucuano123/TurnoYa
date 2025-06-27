import { Custumer } from "./custumer.entity.js";

export interface CustumerRepository {
    findAll(): Promise<Custumer[] | undefined>;
    findOne(id: string): Promise<Custumer | undefined>;
    add(custumer: Custumer): Promise<Custumer | undefined>;
    update(id: string, custumer: Custumer): Promise<Custumer | undefined>;
    partialUpdate(id: string, updates: Partial<Custumer>): Promise<Custumer | undefined>;
    delete(id: string): Promise<Custumer | undefined>;
}
