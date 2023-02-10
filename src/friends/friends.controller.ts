import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { CreateFriendDto } from "./dto/create-friend.dto";
import { UpdateFriendDto } from "./dto/update-friend.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { User } from "src/users/entities/user.entity";
import { Like } from "typeorm";
import { EMessageStatus, EStatus } from "src/constants/enum";
import { Friend } from "./entities/friend.entity";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("friends")
@Controller("friends")
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
    await this.friendsService.create(createFriendDto, req.user.user_id);
    return {
      message: `Votre demande d'ami a bien été envoyée à ${createFriendDto.pseudoAsked} `,
    };
  }

  @Get(":id")
  findOneRequest(@Param("id") id: string) {
    return this.friendsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const dataAsking = await this.friendsService.findFriendsAsking(
      req.user.user_id
    );
    const pressAsking = dataAsking.map((data) => data);
    //return `Vous avez des demandes d'ami.e de : <br/> ${pressAsking}`;
    return {
      message: `Voici les demandes d'amis reçus avec par username et numéro de demande :`,
      liste: pressAsking,
    };
  }

  //Accepter la demande d'ami.e
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateFriendDto: UpdateFriendDto
  ) {
    const dataCheck = await Friend.findOneBy({ id });

    if (!dataCheck) {
      return {
        status: EStatus.FAIL,
        message: EMessageStatus.Unknown + `Cette demande d'ami n'existe pas!!`,
      };
    }
  }
  //le demandeur et receveur peuvent annuler la demande
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id") id: number, @Request() req) {
    const dataCheck = await Friend.findOneBy({ id });

    if (!dataCheck) {
      return {
        status: EStatus.FAIL,
        message:
          EMessageStatus.Unknown + ` Cette demande d'ami n'existe pas !!`,
      };
    }
    const recever = dataCheck.pseudoAsked;
    const sender = dataCheck.user["id"];
    const dataRemove = this.friendsService.remove(+id);
    console.log("recever", recever);
    console.log("sender", sender);
    console.log("req user", req.user);

    if (recever === req.user.username || sender === req.user.user_id) {
      return {
        status: EStatus.OK,
        message: `La demande d'ami a bien été annulée !!`,
      };
    }
    return {
      status: EStatus.FAIL,
      message: EMessageStatus.forbidden,
      data: dataCheck,
    };
  }
}
