import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Car')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  licensePlate: string;

  @Column()
  color: string;

  @Column()
  brand: string;
}
