import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email);

    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    userSignUpDto.password = await this.hashPassword(userSignUpDto.password);
    let user = this.usersRepository.create(userSignUpDto);
    user = await this.usersRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserEntity;
  }

  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const userExists = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: userSignInDto.email })
      .getOne();

    if (!userExists) {
      throw new BadRequestException('Bad credentials');
    }

    const matchPassword = await this.comparePassword(
      userSignInDto.password,
      userExists.password,
    );
    if (!matchPassword) {
      throw new BadRequestException('Bad credentials');
    }

    return userExists;
  }

  generateAccessToken(user: UserEntity) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    return sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
        ? parseInt(process.env.JWT_EXPIRATION, 10)
        : undefined,
    });
  }

  private async hashPassword(password: string) {
    return await (
      hash as (data: string, saltOrRounds: number) => Promise<string>
    )(password, 10);
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await (
      compare as (data: string, encrypted: string) => Promise<boolean>
    )(password, hash);
  }
  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
