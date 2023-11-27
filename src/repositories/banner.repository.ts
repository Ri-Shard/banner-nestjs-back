import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { CreateBannerDto } from 'src/banner/dto/createBanner.dto';
import { Banner } from '../entities/banner.entity';
import { UpdateBannerDto } from 'src/banner/dto/updateBanner.dto';

export class BannerRepository {
    constructor(@InjectModel(Banner.name) private readonly bannerModel: Model<Banner>) {}

    async createBanner(createBannerDto: CreateBannerDto, session: ClientSession) {
        let banner = new this.bannerModel({
            id:createBannerDto.id,
            imagen: createBannerDto.imagen,
            texto:createBannerDto.texto,
            titulo:createBannerDto.titulo
        });
        try {
            banner = await banner.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return banner;
    }

    async updateBanner(updateBanner: UpdateBannerDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            imagen: updateBanner.imagen,
            texto:updateBanner.texto,
            titulo:updateBanner.titulo
        };

        let banner;
        try {
            banner = await this.bannerModel
                .findOneAndUpdate({ id: updateBanner.id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!banner) {
            throw new ConflictException('Error trying to update banner');
        }

        return banner;
    }

    async getBanners(query: GetQueryDto) {
        return await this.bannerModel.find().exec();

    }

    async getBannerById(id: String) {
        let banner;
        try {
            banner = await this.bannerModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!banner) {
            throw new NotFoundException('El banner no existe');
        }

        return banner;
    }

    remove(id: string) {
        // return this.bannerModel.findByIdAndDelete(id);
        const filter  = { id: id };
        return this.bannerModel.findOneAndDelete(filter);

      }
}