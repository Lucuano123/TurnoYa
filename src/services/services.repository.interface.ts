import { Services } from './services.entity';

export interface ServicesRepository {
  findAll(): Promise<Services[] | undefined>;
  findOne(id: string): Promise<Services | undefined>;
  add(service: Services): Promise<Services>;
  update(id: string, service: Services): Promise<Services | undefined>;
  partialUpdate(id: string, updates: Partial<Services>): Promise<Services | undefined>;
  delete(id: string): Promise<Services | undefined>;
}