import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;

  // Permet de s'isoler de l'implémentation du service
  // On mock les return que le service nous rends, le résultat attendu
  const mockUsersService = {
    findOne: jest.fn(),
    create: jest.fn((id, dto) => {
      return {};
    }),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('User informations', () => {
    it('Should return user information by id', () => {
      expect(controller.findOne('1')).toEqual({ id: '1' });
    });
  });
});
