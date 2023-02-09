import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';

@Injectable()
export class PresentationService {
  async createPresentation(createPresentationDto: CreatePresentationDto) {
    const newPresentation = Presentation.create({
      langage: createPresentationDto.langage,
      presentation: createPresentationDto.presentation,
      nationalité: createPresentationDto.nationalité,
      genre: createPresentationDto.genre,
      age: createPresentationDto.age,
      hobbies: createPresentationDto.hobbies,
    });

    const presentation = await Presentation.save(newPresentation);
    return presentation;
  }

  async findAllPresentation() {
    const presentation = await Presentation.find();
    return presentation;
  }

  async findOnePresentation(presentationId: number) {
    const presentation = await Presentation.findOneBy({
      id: presentationId,
    });
    return presentation;
  }

  async updatePresentation(
    presentationId: number,
    updatePresentationDto: UpdatePresentationDto,
  ) {
    const updatePresentation = await Presentation.findOneBy({
      id: presentationId,
    });

    if (updatePresentationDto.langage)
      updatePresentation.langage = updatePresentationDto.langage;
    if (updatePresentationDto.presentation)
      updatePresentation.presentation = updatePresentationDto.presentation;
    if (updatePresentationDto.nationalité)
      updatePresentation.nationalité = updatePresentationDto.nationalité;
    if (updatePresentationDto.genre)
      updatePresentation.genre = updatePresentationDto.genre;
    if (updatePresentationDto.age)
      updatePresentation.age = updatePresentationDto.age;
    if (updatePresentationDto.hobbies)
      updatePresentation.hobbies = updatePresentationDto.hobbies;

    const order = await Presentation.save(updatePresentation);
    return order;
  }

  async removePresentation(user: number): Promise<Presentation | undefined> {
    const deletePresentation = await Presentation.findOneBy({ user: user });
    Presentation.remove(deletePresentation);

    return deletePresentation;
  }

}
