import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { CreateRentalDto } from './create-rental.dto';

export class UpdateRentalDto extends PartialType(CreateRentalDto) {
  @IsDate()
  @IsOptional()
  readonly dateReturened: Date;

  @IsOptional()
  @IsNumber()
  readonly rentalFee: number;
}
