import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  // ==== Auto generated ====
  @PrimaryGeneratedColumn()
  id: number;

  // ==== Manually generated ====
  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "varchar", length: 15, unique: true })
  username: string;

  @Column({ type: "varchar", length: 40, unique: true })
  email: string;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "varchar" })
  password: string;

  @Column({
    type: "varchar",
    enum: ["active", "inactive", "deleted", "banned"],
  })
  status: string;

  @Column("text", { array: true })
  roles: string[];

  @Column({ type: "varchar", nullable: true })
  refreshToken: string | null;

  // ==== Auto generated ====
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
