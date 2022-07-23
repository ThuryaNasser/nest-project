import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TeasService } from '../teas.service';
import { Flavor } from '../entities/tea.flavor.entity';
import { Tea } from '../entities/tea.entity';

// For unit tests -> npm run test
// For unit tests + collecting testing coverage -> npm run test:cov
// For e2e tests -> npm run test:e2e

/*
- Unit Tests
   For unit tests In NestJS,
   it’s a common practice to keep the spec files in the same folder as the application source code files that they test. 
   Each controller, provider, service, etc. should have its own dedicated test file.
   The test file extension must be (dot).spec.ts (this is so that integrated test tooling can identify it as a test file with test suites).

- End-to-End (e2e) Tests
   For e2e tests, these files are typically located in a dedicated `test` directory by default.
   e2e tests are typically grouped into separate files by the feature or functionality that they test.
   The file extension must be (dot).e2e-spec.ts. 

- How are they different?
    unit tests focus on individual classes and functions,
    e2e tests are great for high-level validation of the entire system. 
    e2e testing covers the interaction of classes and modules at a more aggregate level,
    closer to the kind of interaction that end-users will have with the production system. 
*/

//generic func that returns a mock obj with the same methods that Repository class provide
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

// 'describe' for group of test title
describe('TeasService', () => {
  let service: TeasService;
  let teaRepository: MockRepository;

  //'beforeEach' is executed before every test (setup)
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeasService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Tea),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<TeasService>(TeasService);
    teaRepository = module.get<MockRepository>(getRepositoryToken(Tea));
  });

  //'it' stands for individual test
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when tea with ID exists', () => {
      it('should return the tea object', async () => {
        const teaId = '1';
        const expectedTea = {};

        teaRepository.findOne.mockReturnValue(expectedTea);
        const tea = await service.findOne(teaId);
        expect(tea).toEqual(expectedTea);
      });
    });
  });
});
