import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './Car';
import { Driver } from './Driver';

@Entity('CarUse')
export class CarUse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  finalDate: Date;

  @Column()
  reason: string;

  @Column()
  carId: string;

  @Column()
  driverId: string;

  @ManyToMany(() => Car)
  @JoinColumn({ name: 'carId' })
  car: Car;

  @ManyToMany(() => Driver)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;
}
