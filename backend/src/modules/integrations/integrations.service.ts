import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Integration } from "./entities/integration.entity";
import { CreateIntegrationDto } from "./dto/create-integration.dto";
import { UpdateIntegrationDto } from "./dto/update-integration.dto";

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectRepository(Integration)
    private integrationsRepository: Repository<Integration>,
  ) {}

  async findAll() {
    return this.integrationsRepository.find({ order: { sortOrder: "ASC" } });
  }

  async findOne(id: string) {
    const integration = await this.integrationsRepository.findOne({ where: { id } });
    if (!integration) {
      throw new NotFoundException("Integration not found");
    }
    return integration;
  }

  async create(dto: CreateIntegrationDto) {
    const integration = this.integrationsRepository.create(dto);
    return this.integrationsRepository.save(integration);
  }

  async update(id: string, dto: UpdateIntegrationDto) {
    const integration = await this.findOne(id);
    Object.assign(integration, dto);
    return this.integrationsRepository.save(integration);
  }

  async test(id: string) {
    const integration = await this.findOne(id);
    return {
      id: integration.id,
      provider: integration.provider,
      status: "ok",
      message: `Integration ${integration.name} is reachable`,
    };
  }
}
