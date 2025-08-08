// Interfaz del repositorio

// src/services/services.repository.interface.ts

import { Services } from './services.entity';

export interface ServicesRepository {
  create(service: Omit<Services, 'id'>): Promise<Services>;
}
