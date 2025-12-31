import { Controller, Get, Patch, Delete, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get all users (Admin only)' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
        return this.usersService.findAll(page, limit);
    }

    @Get('me')
    @ApiOperation({ summary: 'Get current user profile' })
    getProfile(@Req() req: any) {
        return this.usersService.findOne(req.user.id);
    }

    @Get('stats')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get user statistics (Admin only)' })
    getStats() {
        return this.usersService.getStats();
    }

    @Get(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get user by ID (Admin only)' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch('me')
    @ApiOperation({ summary: 'Update current user profile' })
    updateProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
        return this.usersService.update(req.user.id, dto);
    }

    @Patch(':id/role')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update user role (Admin only)' })
    updateRole(@Param('id') id: string, @Body('role') role: UserRole) {
        return this.usersService.updateRole(id, role);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Deactivate user (Admin only)' })
    deactivate(@Param('id') id: string) {
        return this.usersService.deactivate(id);
    }
}
