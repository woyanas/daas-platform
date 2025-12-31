import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("contact_submissions")
export class ContactSubmission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ nullable: true, length: 50 })
  phone: string;

  @Column({ nullable: true, length: 255 })
  company: string;

  @Column({ nullable: true, length: 255 })
  subject: string;

  @Column({ type: "text" })
  message: string;

  @Column({ name: "is_read", default: false })
  isRead: boolean;

  @Column({ name: "replied_at", type: "timestamptz", nullable: true })
  repliedAt: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;
}
