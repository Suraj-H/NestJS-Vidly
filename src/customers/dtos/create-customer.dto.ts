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
  name: string;

  @IsBoolean()
  @IsOptional()
  isGold: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  phone: string;
}
