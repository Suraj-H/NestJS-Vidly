import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Genre } from 'src/genres/genre.entity';
import { Rental } from 'src/rentals/rental.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @JoinTable()
  @ManyToMany((type) => Genre, (genre) => genre.movies, {
    cascade: true,
  })
  genres: Genre[];

  @Column()
  numberInStock: number;

  @Column()
  dailyRentalRate: number;

  @OneToMany(() => Rental, (rental) => rental.movie)
  rentals: Rental[];
}
