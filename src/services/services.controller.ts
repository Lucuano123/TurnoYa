import { Request, Response } from 'express';
import { Services } from './services.entity.js';
import { ServicesRepository } from './services.repository.interface.js';

export class ServicesController {
  private readonly servicesRepository: ServicesRepository;

  constructor(servicesRepository: ServicesRepository) {
    this.servicesRepository = servicesRepository;
    this.findAllservices = this.findAllservices.bind(this);
    this.addService = this.addService.bind(this);
    this.findServiceById = this.findServiceById.bind(this);
    this.updateService = this.updateService.bind(this);
    this.partialUpdateService = this.partialUpdateService.bind(this);
    this.deleteService = this.deleteService.bind(this);
  }

  async findAllservices(req: Request, res: Response): Promise<void> {
    const services = await this.servicesRepository.findAll();
    res.json(services);
  }

  async findServiceById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const service = await this.servicesRepository.findOne(id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  }

  async addService(req: Request, res: Response): Promise<void> {
    const serviceData: Services = req.body;
    const newService = await this.servicesRepository.add(serviceData);
    res.status(201).json(newService);
  }

  async updateService(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const serviceData: Services = req.body;
    // Si el body trae id y no coincide con la ruta, rechazar
    if ((serviceData as any).id && (serviceData as any).id !== id) {
      res.status(400).json({ message: 'El id del body no coincide con el id de la ruta' });
      return;
    }
    const updatedService = await this.servicesRepository.update(id, serviceData);
    if (updatedService) {
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  }

  async partialUpdateService(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const updates: Partial<Services> = req.body;
    const updatedService = await this.servicesRepository.partialUpdate(id, updates);
    if (updatedService) {
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  }

  async deleteService(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const deletedService = await this.servicesRepository.delete(id);
      if (deletedService) {
        res.json(deletedService);
      } else {
        res.status(404).json({ message: 'Service not found' });
      }
    } catch (error: any) {
      if (error.code === '23503') {
        res.status(409).json({ message: 'No se puede eliminar: el servicio tiene reservas asociadas.' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}