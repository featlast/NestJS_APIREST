import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginService } from './service/loginService';
import { LoginController } from './controller/loginController';
import { User, UserSchema } from './schema';
import { AuthModule } from 'src/auth/module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [
    LoginController
  ],
  providers: [
    LoginService
  ],
  exports: [
    LoginService
  ]
})
export class UserModule {}
