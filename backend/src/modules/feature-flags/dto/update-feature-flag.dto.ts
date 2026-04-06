import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateFeatureFlagDto {
  @ApiPropertyOptional({ example: "Enable advanced reporting" })
  name?: string;

  @ApiPropertyOptional({ example: "Turn on the advanced reporting feature" })
  description?: string;

  @ApiPropertyOptional({ example: true })
  isEnabled?: boolean;

  @ApiPropertyOptional({ example: { tenantOverride: true } })
  settings?: Record<string, any>;

  @ApiPropertyOptional({ example: "tenant-123" })
  tenantId?: string;
}
