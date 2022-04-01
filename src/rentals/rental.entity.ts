import { Customer } from 'src/customers/customer.entity';
import { Movie } from 'src/movies/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.rentals)
  customer: Customer;

  @ManyToOne(() => Movie, (movie) => movie.rentals)
  movie: Movie;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateOut: Date;

  @Column({ type: 'timestamp', nullable: true })
  dateReturened: Date;

  @Column({ default: 0 })
  rentalFee: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
