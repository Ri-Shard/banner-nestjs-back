import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerController } from './banner.controller';
import { Banner, BannerSchema } from 'src/entities/banner.entity';
import { BannerService } from './banner.service';
import { BannerRepository } from 'src/repositories/banner.repository';

@Module({
 controllers: [BannerController],
 imports: [MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }])],
 providers: [BannerService, BannerRepository],
 exports: [BannerService, BannerRepository],
})
export class BannerModule {}