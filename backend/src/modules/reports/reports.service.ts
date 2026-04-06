import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReportDefinition } from "./entities/report-definition.entity";
import { CreateReportDefinitionDto } from "./dto/create-report-definition.dto";
import { UpdateReportDefinitionDto } from "./dto/update-report-definition.dto";

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportDefinition)
    private reportsRepository: Repository<ReportDefinition>,
  ) {}

  async findAll() {
    return this.reportsRepository.find({ order: { createdAt: "DESC" } });
  }

  async findOne(id: string) {
    const report = await this.reportsRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException("Report definition not found");
    }
    return report;
  }

  async create(dto: CreateReportDefinitionDto) {
    const report = this.reportsRepository.create(dto);
    return this.reportsRepository.save(report);
  }

  async update(id: string, dto: UpdateReportDefinitionDto) {
    const report = await this.findOne(id);
    Object.assign(report, dto);
    return this.reportsRepository.save(report);
  }

  async download(id: string) {
    const report = await this.findOne(id);
    return {
      id: report.id,
      name: report.name,
      format: report.format,
      downloadUrl: report.outputUrl || null,
      status: report.status,
    };
  }
}
