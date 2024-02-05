
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Car } from './Car';
import { Driver } from './Driver';

@Entity('CarUse')
export class UtilizacaoAutomovel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @OneToOne(() => Car)
  @JoinColumn({ name: 'carId' })
  car: Car;

  @OneToOne(() => Driver)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

}
