import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Customer } from 'src/customers/customer.entity';
import { Genre } from 'src/genres/genre.entity';
import { Movie } from 'src/movies/movie.entity';
import { Rental } from 'src/rentals/rental.entity';
import { User } from 'src/users/user.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Genre, Movie, Customer, Rental],
    synchronize: true,
  }),
);
