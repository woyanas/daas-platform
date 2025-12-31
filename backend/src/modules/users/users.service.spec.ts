import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
    let service: UsersService;
    let mockRepository: any;

    const mockUser: Partial<User> = {
        id: 'test-uuid',
        email: 'test@example.com',
        fullName: 'Test User',
        role: UserRole.VIEWER,
        isActive: true,
        createdAt: new Date(),
    };

    beforeEach(async () => {
        mockRepository = {
            find: jest.fn(),
            findOne: jest.fn(),
            findAndCount: jest.fn(),
            save: jest.fn(),
            count: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
                select: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                groupBy: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue([]),
            })),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: getRepositoryToken(User), useValue: mockRepository },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    describe('findAll', () => {
        it('should return paginated users', async () => {
            const users = [mockUser];
            mockRepository.findAndCount.mockResolvedValue([users, 1]);

            const result = await service.findAll(1, 10);

            expect(result.data).toEqual(users);
            expect(result.meta.total).toBe(1);
            expect(result.meta.page).toBe(1);
        });
    });

    describe('findOne', () => {
        it('should return user if found', async () => {
            mockRepository.findOne.mockResolvedValue(mockUser);

            const result = await service.findOne('test-uuid');

            expect(result).toEqual(mockUser);
        });

        it('should throw NotFoundException if user not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update and return user', async () => {
            mockRepository.findOne.mockResolvedValue(mockUser);
            mockRepository.save.mockResolvedValue({ ...mockUser, fullName: 'Updated Name' });

            const result = await service.update('test-uuid', { fullName: 'Updated Name' });

            expect(result.fullName).toBe('Updated Name');
        });
    });

    describe('updateRole', () => {
        it('should update user role', async () => {
            mockRepository.findOne.mockResolvedValue(mockUser);
            mockRepository.save.mockResolvedValue({ ...mockUser, role: UserRole.ADMIN });

            const result = await service.updateRole('test-uuid', UserRole.ADMIN);

            expect(result.role).toBe(UserRole.ADMIN);
        });
    });

    describe('deactivate', () => {
        it('should deactivate user', async () => {
            mockRepository.findOne.mockResolvedValue(mockUser);
            mockRepository.save.mockResolvedValue({ ...mockUser, isActive: false });

            await service.deactivate('test-uuid');

            expect(mockRepository.save).toHaveBeenCalledWith({ ...mockUser, isActive: false });
        });
    });

    describe('getStats', () => {
        it('should return user statistics', async () => {
            mockRepository.count.mockResolvedValueOnce(10).mockResolvedValueOnce(8);

            const result = await service.getStats();

            expect(result.total).toBe(10);
            expect(result.active).toBe(8);
            expect(result.inactive).toBe(2);
        });
    });
});
