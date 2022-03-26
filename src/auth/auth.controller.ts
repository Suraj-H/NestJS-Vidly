import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: this.authService.getToken(user),
    };
  }

  @Post('logout')
  logOut(@CurrentUser() user: User): void {
    user = null;
  }
}
