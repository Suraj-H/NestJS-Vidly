import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  readonly name: string;

  @IsBoolean()
  @IsOptional()
  readonly isGold: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  readonly phone: string;
}
