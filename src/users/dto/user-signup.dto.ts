import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignUp {
  @IsNotEmpty()
  @IsString({ message: 'Name is required and must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
