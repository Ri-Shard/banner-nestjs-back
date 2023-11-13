import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { CreateBannerDto } from './dto/createBanner.dto';
import { UpdateBannerDto } from './dto/updateBanner.dto';
import { BannerRepository } from '../repositories/banner.repository';


@Injectable()
export class BannerService {
    constructor(private bannerRepository: BannerRepository) {}

    async createBanner(createbannerDto: CreateBannerDto, session: ClientSession) {
        return await this.bannerRepository.createBanner(createbannerDto, session);
    }

    async getBannerById(bannerId: String) {
        return await this.bannerRepository.getBannerById(bannerId);
    }

    async getBanners(getQueryDto: GetQueryDto) {
        return await this.bannerRepository.getBanners(getQueryDto);
    }

    async updateBanner(UpdateBannerDto: UpdateBannerDto, session: ClientSession) {
        return await this.bannerRepository.updateBanner(UpdateBannerDto, session);
    }
}
