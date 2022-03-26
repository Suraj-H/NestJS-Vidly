import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateRentalDto {
  @IsNumber()
  customerId: number;

  @IsNumber()
  movieId: number;
}
