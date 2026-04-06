import { ApiPropertyOptional } from "@nestjs/swagger";
import { ConnectorType } from "../entities/connector.entity";

export class UpdateConnectorDto {
  @ApiPropertyOptional({ example: "Updated connector" })
  name?: string;

  @ApiPropertyOptional({ enum: ConnectorType, example: ConnectorType.API })
  type?: ConnectorType;

  @ApiPropertyOptional({ example: "Updated description" })
  description?: string;

  @ApiPropertyOptional({ example: { url: "https://api.example.com" } })
  config?: Record<string, any>;

  @ApiPropertyOptional({ example: false })
  isActive?: boolean;

  @ApiPropertyOptional({ example: 200 })
  sortOrder?: number;
}
