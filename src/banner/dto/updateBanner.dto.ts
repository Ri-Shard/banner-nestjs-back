import { PartialType } from '@nestjs/mapped-types';
import { CreateBannerDto } from './createBanner.dto';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {}