import { Test, TestingModule } from '@nestjs/testing';

import { of } from 'rxjs';

import { firstValueFrom } from 'rxjs';

import { GetQueryDto } from 'src/dto/getQueryDto';
import { BannerService } from './banner.service';
import { BannerRepository } from '../repositories/banner.repository';
import { Banner } from 'src/entities/banner.entity';


describe('BannerService', () => {
 let service: BannerService;
 let repository: BannerRepository;

 beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BannerService,
        {
          provide: BannerRepository,
          useValue: {
            getPrendas: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BannerService>(BannerService);
    repository = module.get<BannerRepository>(BannerRepository);
 });

 it('should be defined', () => {
    expect(service).toBeDefined();
 });

 describe('getBanners', () => {
    it('Debe retornar un array de banners', async () => {
      const query: GetQueryDto = new GetQueryDto;
      const mockBanner: Banner = new Banner();
      mockBanner._id = '1';
      mockBanner.titulo ='titulo banner';
      mockBanner.imagen= 'imagen del banner';
      mockBanner.texto = 'texto del banner' ;
      (repository.getBanners as jest.Mock).mockReturnValue(of([mockBanner]));

      const banners = await service.getBanners(query);
      expect(Array.isArray(banners)).toBe(true);
      expect(banners).toContainEqual(mockBanner);
    });
});


});