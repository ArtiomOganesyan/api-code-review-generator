import { Test, TestingModule } from '@nestjs/testing';
import { CampusController } from '../campus/campus.controller';
import { CampusService } from '../campus/campus.service';

describe('CampusController', () => {
  let controller: CampusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampusController],
      providers: [CampusService],
    }).compile();

    controller = module.get<CampusController>(CampusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
