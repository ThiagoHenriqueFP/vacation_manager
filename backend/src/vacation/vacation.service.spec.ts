import { Test, TestingModule } from '@nestjs/testing';
import { VacationService } from './vacation.service';

describe('VacationService', () => {
  let service: VacationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacationService],
    }).compile();

    service = module.get<VacationService>(VacationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
