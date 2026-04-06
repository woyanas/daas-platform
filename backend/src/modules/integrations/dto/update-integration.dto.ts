import { ApiPropertyOptional } from "@nestjs/swagger";
import { IntegrationProvider } from "../entities/integration.entity";

export class UpdateIntegrationDto {
  @ApiPropertyOptional({ example: "Slack alerts" })
  name?: string;

  @ApiPropertyOptional({ enum: IntegrationProvider, example: IntegrationProvider.WEBHOOK })
  provider?: IntegrationProvider;

  @ApiPropertyOptional({ example: "Updated integration description" })
  description?: string;

  @ApiPropertyOptional({ example: { webhookUrl: "https://hooks.slack.com/..." } })
  config?: Record<string, any>;

  @ApiPropertyOptional({ example: false })
  isActive?: boolean;

  @ApiPropertyOptional({ example: 10 })
  sortOrder?: number;
}
