import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { Movie } from 'src/movies/movie.entity';
import { Customer } from 'src/customers/customer.entity';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Movie, Customer]), MoviesModule],
  providers: [RentalsService],
  controllers: [RentalsController],
})
export class RentalsModule {}
