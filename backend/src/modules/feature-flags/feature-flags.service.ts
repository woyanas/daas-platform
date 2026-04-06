import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FeatureFlag } from "./entities/feature-flag.entity";
import { UpdateFeatureFlagDto } from "./dto/update-feature-flag.dto";

@Injectable()
export class FeatureFlagsService {
  constructor(
    @InjectRepository(FeatureFlag)
    private featureFlagsRepository: Repository<FeatureFlag>,
  ) {}

  async findAll() {
    return this.featureFlagsRepository.find({ order: { key: "ASC" } });
  }

  async findOne(id: string) {
    const flag = await this.featureFlagsRepository.findOne({ where: { id } });
    if (!flag) {
      throw new NotFoundException("Feature flag not found");
    }
    return flag;
  }

  async update(id: string, dto: UpdateFeatureFlagDto) {
    const flag = await this.findOne(id);
    Object.assign(flag, dto);
    return this.featureFlagsRepository.save(flag);
  }
}
