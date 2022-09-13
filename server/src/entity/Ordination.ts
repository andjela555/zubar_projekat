import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class Ordination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;
}