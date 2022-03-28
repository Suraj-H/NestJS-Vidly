import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { Genre } from 'src/genres/genre.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { Movie } from './movie.entity';
import { MovieType } from './types/movie.type';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<Movie[]> {
    const { limit, offset } = paginationQueryDto;
    const movies = await this.movieRepository.find({
      relations: ['genres'],
      skip: offset,
      take: limit,
      order: { title: 'ASC' },
    });

    return movies;
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne(id, {
      relations: ['genres'],
    });
    if (!movie) throw new NotFoundException(`movie with id #${id} not found.`);

    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title } = createMovieDto;
    let movie = await this.movieRepository.findOne({ title });
    if (movie)
      throw new BadRequestException(
        `movie with title ${title} already present in record.`,
      );

    const genres = await Promise.all(
      createMovieDto.genres.map((name) => this.preloadGenresByName(name)),
    );
    movie = this.movieRepository.create({
      ...createMovieDto,
      genres,
    });

    return this.movieRepository.save(movie);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const genres =
      updateMovieDto.genres &&
      (await Promise.all(
        updateMovieDto.genres.map((name) => this.preloadGenresByName(name)),
      ));
    const movie = await this.movieRepository.preload({
      id: id,
      ...updateMovieDto,
      genres,
    });
    if (!movie) throw new NotFoundException(`movie with id #${id} not found.`);

    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<Movie> {
    const movie = await this.findOne(id);

    return this.movieRepository.remove(movie);
  }

  private async preloadGenresByName(name: string): Promise<Genre> {
    const existingGenre = await this.genresRepository.findOne({ name });
    if (existingGenre) return existingGenre;
    return this.genresRepository.create({ name });
  }

  private getMovieBaseQuery(): SelectQueryBuilder<Movie> {
    return this.movieRepository
      .createQueryBuilder('movie')
      .orderBy('movie.id', 'ASC');
  }

  async getMovieResponse(movie: Movie): Promise<MovieType> {
    let genreArrays = movie.genres;
    let genres = genreArrays.map((genre: Genre) => genre.name);
    delete movie.genres;
    return { ...movie, genres };
  }
}
