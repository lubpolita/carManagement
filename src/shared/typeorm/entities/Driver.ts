import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Driver')
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}