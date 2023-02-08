import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
<<<<<<< HEAD
        constructor(private authService: AuthService) {
                super();
        }

        async validate(username: string, password: string): Promise<any> {
                const user = await this.authService.validateUser(
                        username,
                        password
                );
                if (!user) {
                        throw new UnauthorizedException();
                }
                return user;
=======
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException();
>>>>>>> b288c7492d594f4a2edf51c4b3bf609d1819d9e1
        }
}
