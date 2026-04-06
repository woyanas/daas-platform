import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AlertRule } from "./entities/alert-rule.entity";
import { CreateAlertRuleDto } from "./dto/create-alert-rule.dto";
import { UpdateAlertRuleDto } from "./dto/update-alert-rule.dto";

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(AlertRule)
    private alertsRepository: Repository<AlertRule>,
  ) {}

  async findAll() {
    return this.alertsRepository.find({ order: { sortOrder: "ASC" } });
  }

  async findOne(id: string) {
    const alert = await this.alertsRepository.findOne({ where: { id } });
    if (!alert) {
      throw new NotFoundException("Alert rule not found");
    }
    return alert;
  }

  async create(dto: CreateAlertRuleDto) {
    const alert = this.alertsRepository.create(dto);
    return this.alertsRepository.save(alert);
  }

  async update(id: string, dto: UpdateAlertRuleDto) {
    const alert = await this.findOne(id);
    Object.assign(alert, dto);
    return this.alertsRepository.save(alert);
  }

  async remove(id: string) {
    const alert = await this.findOne(id);
    await this.alertsRepository.delete(id);
    return { success: true, id: alert.id };
  }
}
