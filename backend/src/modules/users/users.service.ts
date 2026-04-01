import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User, UserRole } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepository.create({
      email: dto.email,
      passwordHash,
      fullName: dto.fullName,
      role: dto.role || UserRole.VIEWER,
      isActive: true,
    });

    return this.usersRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.usersRepository.save(user);
  }

  async updateRole(id: string, role: UserRole): Promise<User> {
    const user = await this.findOne(id);
    user.role = role;
    return this.usersRepository.save(user);
  }

  async deactivate(id: string): Promise<void> {
    const user = await this.findOne(id);
    user.isActive = false;
    await this.usersRepository.save(user);
  }

  async changePassword(id: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.findOne(id);

    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException("Current password is incorrect");
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    user.passwordHash = passwordHash;
    await this.usersRepository.save(user);
  }

  async getStats() {
    const total = await this.usersRepository.count();
    const active = await this.usersRepository.count({
      where: { isActive: true },
    });
    const byRole = await this.usersRepository
      .createQueryBuilder("user")
      .select("user.role", "role")
      .addSelect("COUNT(*)", "count")
      .groupBy("user.role")
      .getRawMany();

    return { total, active, inactive: total - active, byRole };
  }
}
