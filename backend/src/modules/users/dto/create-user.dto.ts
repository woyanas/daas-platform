import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "John Doe" })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ enum: UserRole, default: UserRole.VIEWER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
