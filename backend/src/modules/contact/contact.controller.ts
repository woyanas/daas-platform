import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    @ApiOperation({ summary: 'Submit contact form (public)' })
    create(@Body() dto: CreateContactDto) {
        return this.contactService.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all contact submissions (Admin only)' })
    findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
        return this.contactService.findAll(page, limit);
    }

    @Get('stats')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get contact stats (Admin only)' })
    getStats() {
        return this.contactService.getStats();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get contact submission by ID (Admin only)' })
    findOne(@Param('id') id: string) {
        return this.contactService.findOne(id);
    }

    @Patch(':id/read')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mark as read (Admin only)' })
    markAsRead(@Param('id') id: string) {
        return this.contactService.markAsRead(id);
    }

    @Patch(':id/replied')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mark as replied (Admin only)' })
    markAsReplied(@Param('id') id: string) {
        return this.contactService.markAsReplied(id);
    }
}
