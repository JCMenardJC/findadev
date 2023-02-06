import { Injectable } from '@nestjs/common';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';
import { Langage } from './entities/langage.entity';

@Injectable()
export class LangagesService {
  async create(
    createLangageDto: CreateLangageDto /* ,
    user_id: number, */,
  ): Promise<Langage | undefined> {
    const newLangage = new Langage();
    newLangage.user = createLangageDto.user;
    let i = 1;
    while (createLangageDto[`langage_${i}`]) {
      newLangage[`langage_${i}`] = createLangageDto[`langage_${i}`];
      i++;
    }
    await Langage.save(newLangage);
    const listData = await Langage.find();
    const newData = listData[listData.length - 1];

    if (newData) {
      return newData;
    }
    return undefined;
  }

  async findAll(): Promise<Langage[] | undefined> {
    const data = await Langage.find({
      select: {
        user: false,
      },
    });
    if (data[0]) {
      return data;
    }
    return undefined;
  }

  async findOne(user: number): Promise<Langage | undefined> {
    const dataUser = await Langage.findOneBy({ user });
    if (dataUser) {
      return dataUser;
    }
    return undefined;
  }

  async update(user: number, updateLangageDto: UpdateLangageDto) {
    const dataUpdated = await Langage.update(user, updateLangageDto);

    if (dataUpdated) {
      return dataUpdated;
    }
    return undefined;
  }

  async remove(user: number): Promise<Langage | undefined> {
    const save = await Langage.findOneBy({ user });
    await Langage.delete({ user });
    const verif = await Langage.findOneBy({ user });
    if (verif) {
      return undefined;
    }
    return save;
  }
}
