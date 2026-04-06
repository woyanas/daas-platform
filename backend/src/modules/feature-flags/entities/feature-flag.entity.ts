import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("feature_flags")
export class FeatureFlag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100, unique: true })
  key: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ name: "is_enabled", default: false })
  isEnabled: boolean;

  @Column({ type: "jsonb", default: {} })
  settings: Record<string, any>;

  @Column({ nullable: true })
  tenantId: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
