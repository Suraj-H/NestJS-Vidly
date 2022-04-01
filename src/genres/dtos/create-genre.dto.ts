import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  readonly name: string;
}
