import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Driver')
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
