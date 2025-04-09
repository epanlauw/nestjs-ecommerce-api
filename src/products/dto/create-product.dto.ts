import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'title can not be empty.' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'descripton can not be empty.' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'price should not be empty.' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price should be number & max decimal precssion 2' },
  )
  @IsPositive({ message: 'price should be positive number' })
  price: number;

  @IsNotEmpty({ message: 'stock should not be empty.' })
  @IsNumber({}, { message: 'stock should be number.' })
  @Min(0, { message: 'stock can not be negative.' })
  stock: number;

  @IsNotEmpty({ message: 'images should not be empty.' })
  @IsArray({ message: 'images should be in array format.' })
  images: string[];

  @IsNotEmpty({ message: 'category should not be empty.' })
  @IsNumber({}, { message: 'category id shoud be a number' })
  categoryId: number;
}
