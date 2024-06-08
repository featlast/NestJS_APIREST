import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema';
import { SignInDto } from '../DTO/loginDto';
import { jwtDto } from '../../auth/DTO/authDto';
import { AuthService } from '../../auth/service/authService';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: SignInDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async login(loginUserDto: SignInDto): Promise<string | null> {
    let user: User = await this.findByEmail(loginUserDto.email);

    if (!user) {
      user = await this.create(loginUserDto);
    }

    const authDto: jwtDto = {
      email: user.email,
      id: user._id,
    };

    const token = this.authService.generateToken(authDto);

    return token;
  }
}
