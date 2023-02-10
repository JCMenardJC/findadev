import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { CreateFriendDto } from "./dto/create-friend.dto";
import { UpdateFriendDto } from "./dto/update-friend.dto";
import { Friend } from "./entities/friend.entity";

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

  async findById(id) {
    const findRequestById = await Friend.findOneBy({ id });
    if (!findRequestById) {
      return "Le numéro de demande d'ami recherché n'existe pas";
    } else {
      return findRequestById;
    }
  }

  async findFriendsbyId(user_id) {
    const data = await Friend.findBy({
      user: user_id,
      response: true,
    });
    return data.map((data) => data.pseudoAsked);
  }

  async findFriendsAsking(user_id) {
    const username = await (await User.findOneBy({ id: user_id })).username;

    const data = await Friend.findBy({
      pseudoAsked: username,
      response: false,
    });

    return data.map((data) => ({ user: data.user["username"], id: data.id }));
  }

  async findAllFriendsRequest(user_id) {
    const username = (await User.findOneBy({ id: user_id })).username;
    const data = await Friend.findBy({
      pseudoAsked: username,
      response: false,
    });
    return data;
  }

  async update(id: number, updateFriendsDto: UpdateFriendDto) {
    const data = await this.findById(id);
    updateFriendsDto.response = true;
    await Friend.update(id, updateFriendsDto);
    const dataUpdated = await this.findById(id);
    return dataUpdated;
  }

  async remove(id: number) {
    const idRequest = await Friend.findOneBy({ id });
    if (!idRequest) {
      return "Cette demande d'ami n'existe pas !!";
    }
    await Friend.remove(idRequest);
    return idRequest;
  }
}
