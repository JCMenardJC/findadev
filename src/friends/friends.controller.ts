import {
        Controller,
        Get,
        Post,
        Body,
        Patch,
        Param,
        Delete,
        UseGuards,
        Res,
        Request,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'typeorm';
import { EMessageStatus, EStatus } from 'src/constants/enum';

@Controller('friends')
export class FriendsController {
        constructor(private readonly friendsService: FriendsService) {}

        @UseGuards(JwtAuthGuard)
        @Post()
        async create(@Body() createFriendDto: CreateFriendDto, @Request() req) {
                const userCheck = await User.findBy({
                        username: Like(`%${createFriendDto.pseudoAsked}%`),
                });

                if (!userCheck[0]) {
                        return {
                                status: EStatus.FAIL,
                                message: EMessageStatus.Unknown,
                        };
                }
                if (userCheck.length > 1) {
                        return {
                                status: EStatus.OK,
                                message: ` Merci d'affiner votre recherche, voir la liste `,
                                liste: userCheck,
                        };
                }
                const listFriends = await this.friendsService.findFriendsbyId(
                        req.user.user_id
                );
                if (listFriends.includes(createFriendDto.pseudoAsked)) {
                        return {
                                status: EStatus.OK,
                                message: `Vous etes déjà ami.e avec ${createFriendDto.pseudoAsked} `,
                        };
                }
                await this.friendsService.create(
                        createFriendDto,
                        req.user.user_id
                );
                return {
                        message: `Votre demande d'ami a bien été envoyée à ${createFriendDto.pseudoAsked} `,
                };
        }

        @UseGuards(JwtAuthGuard)
        @Get()
        async findAll(@Request() req) {
                const dataAsking = await this.friendsService.findFriendsAsking(
                        req.user.user_id
                );
                const pressAsking = dataAsking.map((data) => `${data} <br/>`);
                return `Vous avez des demandes d'ami.e de : <br/> ${pressAsking}`;
        }

        @Get(':id')
        findOne(@Param('id') id: string) {
                return this.friendsService.findOne(+id);
        }

        //Accepter la demande d'ami.e
        @Patch(':id')
        update(
                @Param('id') id: string,
                @Body() updateFriendDto: UpdateFriendDto
        ) {
                return this.friendsService.update(+id, updateFriendDto);
        }

        //le demandeur et receveur peuvent annuler la demande
        @Delete(':id')
        remove(@Param('id') id: string) {
                return this.friendsService.remove(+id);
        }
}
