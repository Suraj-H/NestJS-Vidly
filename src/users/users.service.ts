import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username: username, email, password } = createUserDto;

    let user = await this.userRepository.findOne({ email, username });
    if (user) throw new BadRequestException('user already registered.');
    user = this.userRepository.create({ username: username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    if (!id) return null;

    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`user with id #${id} not found.`);

    return user;
  }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<User[]> {
    const { limit, offset } = paginationQueryDto;
    const user = await this.userRepository.find({
      skip: offset,
      take: limit,
      order: { username: 'ASC' },
    });
    return this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) throw new NotFoundException(`user with id #${id} not found.`);

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    return this.userRepository.remove(user);
  }
}
