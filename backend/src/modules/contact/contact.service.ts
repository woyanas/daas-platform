import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactSubmission } from "./entities/contact.entity";
import { CreateContactDto } from "./dto/contact.dto";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactSubmission)
    private contactRepository: Repository<ContactSubmission>,
  ) {}

  async create(dto: CreateContactDto): Promise<ContactSubmission> {
    const submission = this.contactRepository.create(dto);
    return this.contactRepository.save(submission);
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.contactRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string): Promise<ContactSubmission> {
    const submission = await this.contactRepository.findOne({ where: { id } });
    if (!submission) {
      throw new NotFoundException("Contact submission not found");
    }
    return submission;
  }

  async markAsRead(id: string): Promise<ContactSubmission> {
    const submission = await this.findOne(id);
    submission.isRead = true;
    return this.contactRepository.save(submission);
  }

  async markAsReplied(id: string): Promise<ContactSubmission> {
    const submission = await this.findOne(id);
    submission.repliedAt = new Date();
    return this.contactRepository.save(submission);
  }

  async getStats() {
    const total = await this.contactRepository.count();
    const unread = await this.contactRepository.count({
      where: { isRead: false },
    });
    return { total, unread, read: total - unread };
  }
}
