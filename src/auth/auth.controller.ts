import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }
}
