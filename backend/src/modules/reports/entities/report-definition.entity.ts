import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum ReportType {
  DASHBOARD = "dashboard",
  USAGE = "usage",
  CUSTOM = "custom",
}

export enum ReportFormat {
  PDF = "pdf",
  EXCEL = "excel",
  CSV = "csv",
}

export enum ReportStatus {
  DRAFT = "draft",
  READY = "ready",
  COMPLETED = "completed",
}

@Entity("report_definitions")
export class ReportDefinition {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "enum", enum: ReportType, default: ReportType.DASHBOARD })
  type: ReportType;

  @Column({ type: "enum", enum: ReportFormat, default: ReportFormat.PDF })
  format: ReportFormat;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ type: "jsonb", default: {} })
  criteria: Record<string, any>;

  @Column({ type: "enum", enum: ReportStatus, default: ReportStatus.DRAFT })
  status: ReportStatus;

  @Column({ name: "output_url", nullable: true, type: "text" })
  outputUrl: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
