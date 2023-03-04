import { Test, TestingModule } from '@nestjs/testing';
import { EthController } from './eth.controller';
import { EthService } from './eth.service';

describe('EthController', () => {
  let ethController: EthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EthController],
      providers: [EthService],
    }).compile();

    ethController = app.get<EthController>(EthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const elphex =
        'f90110b842307839623266366133633265316165643263636366393262613636366332326430353361643064386135646137616131666435343737646364363537376234353234b842307835613537653330353163623932653264343832353135623037653762336431383531373232613734363534363537626436346131346333396361336639636632b842307837316239653262343464343034393863303861363239383866616337373664306561633062356239363133633337663966366639613462383838613862303537b842307863356639366266316235346433333134343235643233373962643737643765643465363434663763366538343961373438333230323862333238643464373938';
      expect(ethController.getTransactions(elphex)).toBe('Hello World!');
    });
  });
});
