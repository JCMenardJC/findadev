import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './users/dto/loginDto';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @ApiTags('Login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    @ApiBearerAuth()
    @ApiTags('Controle du token')
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
