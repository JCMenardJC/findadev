import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = new User();

    user.mail = createUserDto.mail;
    user.username = createUserDto.username;
    user.prenom = createUserDto.prenom;
    user.pseudo = createUserDto.pseudo;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.adress_line = createUserDto.adress_line;
    user.zipCode = createUserDto.zipCode;
    user.city = createUserDto.city;
    user.region = createUserDto.region;
    user.departement = createUserDto.departement;
    user.pays = createUserDto.pays;
    await User.save(user);
    return user;
  }

  async findAll() {
    return await User.find({
      select: {
        password: false,
      },
    });
  }

  async findOne(id: number) {
    return await User.findOneBy({ id: id });
  }
  async findOneMail(mail: string) {
    return await User.findOneBy({ mail: mail });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await User.update(id, updateUserDto);
    const updateUser = User.findOneBy({ id: id });
    return updateUser;
  }
  async remove(id: number) {
    const deleteUser = await User.findOneBy({ id: id });
    User.remove(deleteUser);
    return deleteUser;
  }
}
