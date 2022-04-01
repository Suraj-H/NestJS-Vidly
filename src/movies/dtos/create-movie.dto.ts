import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly title: string;

  @IsNotEmpty()
  @IsString({ each: true })
  readonly genres: string[];

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(2000)
  readonly numberInStock: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000)
  readonly dailyRentalRate: number;
}
