import { ApiPropertyOptional } from "@nestjs/swagger";
import { AlertType } from "../entities/alert-rule.entity";

export class UpdateAlertRuleDto {
  @ApiPropertyOptional({ example: "High usage alert" })
  name?: string;

  @ApiPropertyOptional({ enum: AlertType, example: AlertType.THRESHOLD })
  type?: AlertType;

  @ApiPropertyOptional({ example: "Updated description" })
  description?: string;

  @ApiPropertyOptional({ example: { threshold: 95, channels: ["email"] } })
  settings?: Record<string, any>;

  @ApiPropertyOptional({ example: false })
  isActive?: boolean;

  @ApiPropertyOptional({ example: 1 })
  sortOrder?: number;
}
