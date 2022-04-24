import { Test, TestingModule } from '@nestjs/testing';
import { TeasController } from './teas.controller';

describe('TeasController', () => {
  let controller: TeasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeasController],
    }).compile();

    controller = module.get<TeasController>(TeasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
