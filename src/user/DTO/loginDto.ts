import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string;
}
