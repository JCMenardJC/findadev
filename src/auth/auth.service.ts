import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

<<<<<<< HEAD
        async validateUser(username: string, password: string): Promise<any> {
                const user = await User.find({
                        where: { username },
                        select: {
                                id: true,
                                username: true,
                                password: true,
                        },
                });
=======
    async validateUser(username: string, password: string): Promise<any> {
        const user = await User.find({
            where: { username },
            select: { id: true, username: true, password: true },
        });
>>>>>>> b288c7492d594f4a2edf51c4b3bf609d1819d9e1

        const verifPassword = await bcrypt.compare(password, user[0].password);

        if (user && verifPassword) {
            const { password, ...result } = user[0];

            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
