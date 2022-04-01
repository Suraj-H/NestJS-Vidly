import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Genre } from 'src/genres/genre.entity';
import { Connection, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Movie),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Genre),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<MockRepository>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when movie with ID exists', () => {
      it('should return the movie object', async () => {
        const movieId = 1;
        const expectedMovie = {};

        movieRepository.findOne.mockReturnValue(expectedMovie);
        const movie = await service.findOne(movieId);
        expect(movie).toEqual(expectedMovie);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const movieId = 1;
        movieRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(movieId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`movie with id #${movieId} not found.`);
        }
      });
    });
  });
});
