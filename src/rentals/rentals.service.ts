import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/customer.entity';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { Movie } from 'src/movies/movie.entity';
import { MoviesService } from 'src/movies/movies.service';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dtos/create-rental.dto';
import { UpdateRentalDto } from './dtos/update-rental.dto';
import { Rental } from './rental.entity';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly moviesService: MoviesService,
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<Rental[]> {
    const { limit, offset } = paginationQueryDto;
    const rental = await this.rentalRepository.find({
      relations: ['movie', 'customer'],
      skip: offset,
      take: limit,
    });

    return rental;
  }

  async findOne(id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne(id, {
      relations: ['movie', 'customer'],
    });
    if (!rental)
      throw new NotFoundException(`Rental record with Id #${id} not found.`);

    return rental;
  }

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {
    const { customerId, movieId } = createRentalDto;

    const customer = await this.customerRepository.findOne(customerId);
    if (!customer) throw new BadRequestException('invalid customer.');

    const movie = await this.movieRepository.findOne(movieId);
    if (!movie) throw new BadRequestException('invalid movie.');

    --movie.numberInStock;

    let rental = this.rentalRepository.create({
      customer: customer,
      movie: movie,
      rentalFee: movie.dailyRentalRate,
    });

    this.moviesService.update(movie.id, { numberInStock: movie.numberInStock });

    return this.rentalRepository.save(rental);
  }

  async update(id: number, updateRentalDto: UpdateRentalDto): Promise<Rental> {
    const rental = await this.rentalRepository.preload({
      id: id,
      ...updateRentalDto,
    });

    if (!rental)
      throw new NotFoundException(`rental with id #${id} not found.`);

    return this.rentalRepository.save(rental);
  }

  async remove(id: number): Promise<Rental> {
    const rental = await this.findOne(id);

    return this.rentalRepository.remove(rental);
  }
}
