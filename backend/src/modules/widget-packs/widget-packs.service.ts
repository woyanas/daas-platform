import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WidgetPack } from "./entities/widget-pack.entity";
import { CreateWidgetPackDto } from "./dto/create-widget-pack.dto";
import { UpdateWidgetPackDto } from "./dto/update-widget-pack.dto";

@Injectable()
export class WidgetPacksService {
  constructor(
    @InjectRepository(WidgetPack)
    private widgetPacksRepository: Repository<WidgetPack>,
  ) {}

  async findAll() {
    return this.widgetPacksRepository.find({ order: { sortOrder: "ASC" } });
  }

  async findOne(id: string) {
    const pack = await this.widgetPacksRepository.findOne({ where: { id } });
    if (!pack) {
      throw new NotFoundException("Widget pack not found");
    }
    return pack;
  }

  async create(dto: CreateWidgetPackDto) {
    const pack = this.widgetPacksRepository.create(dto);
    return this.widgetPacksRepository.save(pack);
  }

  async update(id: string, dto: UpdateWidgetPackDto) {
    const pack = await this.findOne(id);
    Object.assign(pack, dto);
    return this.widgetPacksRepository.save(pack);
  }

  async remove(id: string) {
    const pack = await this.findOne(id);
    await this.widgetPacksRepository.delete(id);
    return { success: true, id: pack.id };
  }
}
