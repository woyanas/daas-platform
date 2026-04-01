import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsNotEmpty } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({ example: "currentPassword123" })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ example: "newPassword456", minLength: 6 })
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({ example: "newPassword456" })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
