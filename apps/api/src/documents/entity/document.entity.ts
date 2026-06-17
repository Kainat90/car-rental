import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { User } from '../../modules/user/entity/user.entity'

export enum DocType {
  CNIC = 'cnic',
  VEHICLE_REGISTRATION = 'vehicle_registration'
}

export enum DocStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  user_id!: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column({ type: 'enum', enum: DocType })
  doc_type!: DocType

  @Column()
  file_url!: string

  @Column({ type: 'enum', enum: DocStatus, default: DocStatus.PENDING })
  status!: DocStatus

  @Column({ nullable: true })
  approved_by!: number

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver!: User

  @CreateDateColumn()
  created_at!: Date

  @CreateDateColumn()
  uploaded_at!: Date
}