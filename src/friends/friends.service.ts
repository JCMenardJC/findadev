import { Injectable } from '@nestjs/common';
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
    return `This action returns all friends`;
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
