import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service, ServiceConfig } from './entities/service.entity';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
        @InjectRepository(ServiceConfig)
        private serviceConfigsRepository: Repository<ServiceConfig>,
    ) { }

    async findAll() {
        return this.servicesRepository.find({
            where: { isActive: true },
            order: { sortOrder: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Service> {
        const service = await this.servicesRepository.findOne({ where: { id } });
        if (!service) {
            throw new NotFoundException('Service not found');
        }
        return service;
    }

    async getUserConfigs(userId: string) {
        const configs = await this.serviceConfigsRepository.find({
            where: { userId },
            relations: ['service'],
        });

        const allServices = await this.findAll();

        return allServices.map((service) => {
            const config = configs.find((c) => c.serviceId === service.id);
            return {
                ...service,
                isEnabled: config?.isEnabled ?? false,
                settings: config?.settings ?? {},
            };
        });
    }

    async updateConfig(userId: string, serviceId: string, data: { isEnabled?: boolean; settings?: Record<string, any> }) {
        let config = await this.serviceConfigsRepository.findOne({
            where: { userId, serviceId },
        });

        if (!config) {
            config = this.serviceConfigsRepository.create({
                userId,
                serviceId,
                isEnabled: data.isEnabled ?? true,
                settings: data.settings ?? {},
            });
        } else {
            if (data.isEnabled !== undefined) config.isEnabled = data.isEnabled;
            if (data.settings) config.settings = { ...config.settings, ...data.settings };
        }

        return this.serviceConfigsRepository.save(config);
    }
}
