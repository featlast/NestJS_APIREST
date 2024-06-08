import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../service/loginService';
import { SignInDto } from '../DTO/loginDto';

@Controller('login/v1')
export class LoginController {
  constructor(private readonly userService: LoginService) {}

  @Post('signIn')
  async signIn(@Body() loginUserDto: SignInDto): Promise<string | null> {
    return this.userService.login(loginUserDto);
  }
}
