import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let service: AuthService;
    let mockUsersRepository: any;
    let mockRefreshTokensRepository: any;
    let mockJwtService: any;

    const mockUser: Partial<User> = {
        id: 'test-uuid',
        email: 'test@example.com',
        passwordHash: '$2b$10$hashedpassword',
        fullName: 'Test User',
        role: UserRole.VIEWER,
        isActive: true,
    };

    beforeEach(async () => {
        mockUsersRepository = {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
        };

        mockRefreshTokensRepository = {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
        };

        mockJwtService = {
            sign: jest.fn().mockReturnValue('mock-jwt-token'),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: getRepositoryToken(User), useValue: mockUsersRepository },
                { provide: getRepositoryToken(RefreshToken), useValue: mockRefreshTokensRepository },
                { provide: JwtService, useValue: mockJwtService },
                { provide: ConfigService, useValue: { get: jest.fn().mockReturnValue('15m') } },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    describe('register', () => {
        it('should throw ConflictException if email already exists', async () => {
            mockUsersRepository.findOne.mockResolvedValue(mockUser);

            await expect(
                service.register({ email: 'test@example.com', password: 'password', fullName: 'Test' }),
            ).rejects.toThrow(ConflictException);
        });

        it('should create a new user and return tokens', async () => {
            mockUsersRepository.findOne.mockResolvedValue(null);
            mockUsersRepository.create.mockReturnValue(mockUser);
            mockUsersRepository.save.mockResolvedValue(mockUser);
            mockRefreshTokensRepository.create.mockReturnValue({});
            mockRefreshTokensRepository.save.mockResolvedValue({});

            const result = await service.register({
                email: 'new@example.com',
                password: 'password',
                fullName: 'New User',
            });

            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('refreshToken');
            expect(result).toHaveProperty('user');
        });
    });

    describe('login', () => {
        it('should throw UnauthorizedException for invalid email', async () => {
            mockUsersRepository.findOne.mockResolvedValue(null);

            await expect(
                service.login({ email: 'wrong@example.com', password: 'password' }),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException for invalid password', async () => {
            mockUsersRepository.findOne.mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

            await expect(
                service.login({ email: 'test@example.com', password: 'wrongpassword' }),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('should return tokens for valid credentials', async () => {
            mockUsersRepository.findOne.mockResolvedValue(mockUser);
            mockUsersRepository.save.mockResolvedValue(mockUser);
            mockRefreshTokensRepository.create.mockReturnValue({});
            mockRefreshTokensRepository.save.mockResolvedValue({});
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

            const result = await service.login({
                email: 'test@example.com',
                password: 'password',
            });

            expect(result.accessToken).toBe('mock-jwt-token');
            expect(result.user.email).toBe('test@example.com');
        });
    });

    describe('logout', () => {
        it('should revoke all refresh tokens for user', async () => {
            mockRefreshTokensRepository.update.mockResolvedValue({ affected: 1 });

            await service.logout('test-uuid');

            expect(mockRefreshTokensRepository.update).toHaveBeenCalledWith(
                { userId: 'test-uuid', isRevoked: false },
                { isRevoked: true },
            );
        });
    });
});
