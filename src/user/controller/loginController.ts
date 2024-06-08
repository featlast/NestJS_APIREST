import { Controller, Post, Body,   BadRequestException,  Logger } from '@nestjs/common';
import { LoginService } from '../service/loginService';
import { SignInDto } from '../DTO/loginDto';

@Controller('login/v1')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);
  constructor(private readonly userService: LoginService) {}

  @Post('signIn')
  signIn(@Body() loginUserDto: SignInDto): Promise<string | null> {
    this.logger.log(`Login endpoint called`);
    return this.userService.login(loginUserDto);
  }

}
