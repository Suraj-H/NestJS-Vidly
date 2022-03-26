import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { UpdateGenreDto } from './dtos/update-genre.dto';
import { Genre } from './genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<Genre[]> {
    const { limit, offset } = paginationQueryDto;
    const genres = await this.genreRepository.find({
      take: limit,
      skip: offset,
      relations: ['movies'],
      order: { name: 'ASC' },
    });

    return genres;
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne(id);
    if (!genre) throw new NotFoundException(`genre with id #${id} not found.`);

    return genre;
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const { name } = createGenreDto;
    let genre = await this.genreRepository.findOne({ name });
    if (genre)
      throw new BadRequestException(`genre with name ${name} already present.`);
    genre = this.genreRepository.create(createGenreDto);

    return this.genreRepository.save(genre);
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.genreRepository.preload({
      id: id,
      ...updateGenreDto,
    });
    if (!genre) throw new NotFoundException(`genre with id #${id} not found.`);

    return this.genreRepository.save(genre);
  }

  async remove(id: number): Promise<Genre> {
    const genre = await this.findOne(id);

    return this.genreRepository.remove(genre);
  }
}
