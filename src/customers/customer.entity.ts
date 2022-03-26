import { Rental } from 'src/rentals/rental.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isGold: boolean;

  @Column()
  phone: string;

  @OneToMany(() => Rental, (rental) => rental.customer)
  rentals: Rental[];
}
