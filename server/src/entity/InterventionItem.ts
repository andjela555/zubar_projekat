import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Intervention } from "./Intervention";
import { Service } from "./Service";


@Entity()
export class InterventionItem {

  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  interventionId: number;

  @Column()
  serviceId: number;

  @Column()
  unitPrice: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Service)
  @JoinColumn({
    name: 'serviceId'
  })
  service: Service;

  @ManyToOne(() => Intervention, intervention => intervention.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'interventionId' })
  intervention: Intervention;
}