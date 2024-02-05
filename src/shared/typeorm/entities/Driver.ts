import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Driver')
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
}