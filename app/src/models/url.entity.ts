import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique('url_unique', ['url'])
@Entity('url')
export class UrlEntity {
  @Column({ type: 'int4' })
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'bool' })
  isActive: boolean;
}
