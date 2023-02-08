import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendsService {
        async create(createFriendDto: CreateFriendDto, user: number) {
                const newFriends = new Friend();
                newFriends.user = user;
                newFriends.pseudoAsked = createFriendDto.pseudoAsked;
                newFriends.response = createFriendDto.response;
                await newFriends.save();
                return newFriends;
        }

        findAll() {
                return Friend.find();
        }

        async findFriendsbyId(user_id) {
                const data = await Friend.findBy({
                        user: user_id,
                        response: true,
                });
                return data.map((data) => data.pseudoAsked);
        }

        async findFriendsAsking(user_id) {
                const username = await (
                        await User.findOneBy({ id: user_id })
                ).username;

                const data = await Friend.findBy({
                        pseudoAsked: username,
                        response: false,
                });
                return data.map((data) => data.user['username']);
        }

        findOne(id: number) {
                return `This action returns a #${id} friend`;
        }

        update(id: number, updateFriendDto: UpdateFriendDto) {
                return `This action updates a #${id} friend`;
        }

        remove(id: number) {
                return `This action removes a #${id} friend`;
        }
}
