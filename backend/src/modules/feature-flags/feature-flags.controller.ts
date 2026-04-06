import { Controller, Get, Patch, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { FeatureFlagsService } from "./feature-flags.service";
import { UpdateFeatureFlagDto } from "./dto/update-feature-flag.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("services")
@Controller("services/feature-flags")
@UseGuards(JwtAuthGuard)
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  @Get()
  @ApiOperation({ summary: "List feature flags" })
  findAll() {
    return this.featureFlagsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get feature flag details" })
  findOne(@Param("id") id: string) {
    return this.featureFlagsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a feature flag" })
  update(@Param("id") id: string, @Body() dto: UpdateFeatureFlagDto) {
    return this.featureFlagsService.update(id, dto);
  }
}
