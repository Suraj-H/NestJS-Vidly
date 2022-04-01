import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateRentalDto {
  @IsNumber()
  readonly customerId: number;

  @IsNumber()
  readonly movieId: number;
}
