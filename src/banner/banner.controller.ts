import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from 'src/dto/getQueryDto';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/createBanner.dto';
import { UpdateBannerDto } from './dto/updateBanner.dto';

@Controller('banner')
export class BannerController {
  constructor( private  bannerService: BannerService, @InjectConnection() private readonly mongoConnection: Connection) {}


  @Post('/createBanner')
  async createBanner(@Body() createBannerDto: CreateBannerDto, @Res() res: Response) {
      const session = await this.mongoConnection.startSession();
      session.startTransaction();
      try {
          const newBanner: any = await this.bannerService.createBanner(createBannerDto, session);
          await session.commitTransaction();
          return res.status(HttpStatus.OK).send(newBanner);
      } catch (error) {
          await session.abortTransaction();
          throw new BadRequestException(error);
      } finally {
          session.endSession();
      }
  }

  @Put('/updateBanner/:id')
  async updateBanner(@Param('id') id: String, @Body() updateBannerDto: UpdateBannerDto, @Res() res: Response) {
      const session = await this.mongoConnection.startSession();
      session.startTransaction();
      try {
          const newBanner: any = await this.bannerService.updateBanner(updateBannerDto, session);
          await session.commitTransaction();
          return res.status(HttpStatus.OK).send(newBanner);
      } catch (error) {
          await session.abortTransaction();
          throw new BadRequestException(error);
      } finally {
          session.endSession();
      }
  }

  @Get('/getBannerById/:id')
  async getProductById(@Param('id') id: String, @Res() res: Response) {
      const storage: any = await this.bannerService.getBannerById(id);
      return res.status(HttpStatus.OK).send(storage);
  }

  @Get('/getBanner')
  async getAllBanner(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
      const storages: any = await this.bannerService.getBanners(getQueryDto);
      return res.status(HttpStatus.OK).send(storages);
  }

}




