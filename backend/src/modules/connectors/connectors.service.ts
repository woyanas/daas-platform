import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Connector } from "./entities/connector.entity";
import { CreateConnectorDto } from "./dto/create-connector.dto";
import { UpdateConnectorDto } from "./dto/update-connector.dto";

@Injectable()
export class ConnectorsService {
  constructor(
    @InjectRepository(Connector)
    private connectorsRepository: Repository<Connector>,
  ) {}

  async findAll() {
    return this.connectorsRepository.find({ order: { sortOrder: "ASC" } });
  }

  async findOne(id: string) {
    const connector = await this.connectorsRepository.findOne({ where: { id } });
    if (!connector) {
      throw new NotFoundException("Connector not found");
    }
    return connector;
  }

  async create(dto: CreateConnectorDto) {
    const connector = this.connectorsRepository.create(dto);
    return this.connectorsRepository.save(connector);
  }

  async update(id: string, dto: UpdateConnectorDto) {
    const connector = await this.findOne(id);
    Object.assign(connector, dto);
    return this.connectorsRepository.save(connector);
  }

  async remove(id: string) {
    const connector = await this.findOne(id);
    await this.connectorsRepository.delete(id);
    return { success: true, id: connector.id };
  }
}
