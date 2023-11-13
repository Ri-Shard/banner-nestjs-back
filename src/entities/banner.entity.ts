import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


@Schema()
export class Banner extends Document {
    @Prop({ type: String, required: true})
    _id: string;

    @Prop({ type: String })
    imagen: string;

    @Prop({ type: String })
    texto: string;

    @Prop({ type: String })
    titulo: string;


}

export const BannerSchema = SchemaFactory.createForClass(Banner);
