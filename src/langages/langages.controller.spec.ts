import { Test, TestingModule } from '@nestjs/testing';
import { LangagesController } from './langages.controller';
import { LangagesService } from './langages.service';

describe('LangagesController', () => {
  let controller: LangagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangagesController],
      providers: [LangagesService],
    }).compile();

    controller = module.get<LangagesController>(LangagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
