import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { CreateMovieDto } from './dtos/create-movie.dto';

import { UpdateMovieDto } from './dtos/update-movie.dto';
import { MovieInterceptor } from './interceptors/movie.interceptor';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  private readonly logger: Logger;

  constructor(private readonly moviesService: MoviesService) {
    this.logger = new Logger(MoviesController.name);
  }

  @Get()
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<Movie[]> {
    this.logger.log('Hit the findAll route.');
    const movies = await this.moviesService.findAll(paginationQueryDto);
    this.logger.debug(`Found ${movies.length} movies.`);

    return movies;
  }

  //@UseInterceptors(MovieInterceptor)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    const movie = await this.moviesService.findOne(+id);
    return movie;
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.remove(+id);
  }
}
