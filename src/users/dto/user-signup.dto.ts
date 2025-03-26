import { IsNotEmpty, IsString } from 'class-validator';
import { UserSignInDto } from './user-signin.dto';

export class UserSignUpDto extends UserSignInDto {
  @IsNotEmpty()
  @IsString({ message: 'Name is required and must be a string' })
  name: string;
}
