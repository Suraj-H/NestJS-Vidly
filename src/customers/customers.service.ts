import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<Customer[]> {
    const { limit, offset } = paginationQueryDto;
    const customers = await this.customerRepository.find({
      skip: offset,
      take: limit,
      order: { name: 'ASC' },
    });

    return customers;
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne(id);
    if (!customer)
      throw new NotFoundException(`customer with id #${id} not found.`);

    return customer;
  }

  async create(creatCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { name } = creatCustomerDto;
    let customer = await this.customerRepository.findOne({ name });
    if (customer)
      throw new BadRequestException(
        `customer with name ${name} already present.`,
      );
    customer = this.customerRepository.create(creatCustomerDto);

    return this.customerRepository.save(customer);
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepository.preload({
      id: id,
      ...updateCustomerDto,
    });

    if (!customer)
      throw new NotFoundException(`movie with id #${id} not found.`);

    return this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.findOne(id);

    return this.customerRepository.remove(customer);
  }
}
