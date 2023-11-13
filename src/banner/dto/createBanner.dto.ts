import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateBannerDto {

    _id: string;
    @IsOptional()
    imagen: string;
    @IsOptional()   
    texto: string;
    @IsOptional()
    titulo: string;

}
