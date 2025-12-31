import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(RefreshToken)
        private refreshTokensRepository: Repository<RefreshToken>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(dto: RegisterDto): Promise<AuthResponseDto> {
        // Check if user exists
        const existingUser = await this.usersRepository.findOne({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(dto.password, 10);

        // Create user
        const user = this.usersRepository.create({
            email: dto.email,
            passwordHash,
            fullName: dto.fullName,
        });

        await this.usersRepository.save(user);

        // Generate tokens
        return this.generateTokens(user);
    }

    async login(dto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.usersRepository.findOne({
            where: { email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Account is deactivated');
        }

        // Update last login
        user.lastLoginAt = new Date();
        await this.usersRepository.save(user);

        return this.generateTokens(user);
    }

    async refreshTokens(refreshToken: string): Promise<AuthResponseDto> {
        const tokenHash = await bcrypt.hash(refreshToken, 10);

        // Find the token record (simplified - in production, compare hash properly)
        const storedToken = await this.refreshTokensRepository.findOne({
            where: { isRevoked: false },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });

        if (!storedToken || storedToken.expiresAt < new Date()) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        // Revoke old token
        storedToken.isRevoked = true;
        await this.refreshTokensRepository.save(storedToken);

        return this.generateTokens(storedToken.user);
    }

    async logout(userId: string): Promise<void> {
        await this.refreshTokensRepository.update(
            { userId, isRevoked: false },
            { isRevoked: true },
        );
    }

    private async generateTokens(user: User): Promise<AuthResponseDto> {
        const payload = { sub: user.id, email: user.email, role: user.role };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '15m'),
        });

        const refreshToken = uuidv4();
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

        // Store refresh token
        const refreshTokenEntity = this.refreshTokensRepository.create({
            userId: user.id,
            tokenHash: refreshTokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });

        await this.refreshTokensRepository.save(refreshTokenEntity);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            },
        };
    }

    async validateUser(payload: { sub: string }): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id: payload.sub, isActive: true },
        });
    }
}
