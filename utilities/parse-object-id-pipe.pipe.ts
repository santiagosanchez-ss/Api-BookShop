import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import mongoose from 'mongoose';


@Injectable()
export class ParseObjectIdPipe
implements PipeTransform<any, mongoose.Types.ObjectId>
{
    transform(value: any, metadata: ArgumentMetadata): mongoose.Types.ObjectId {
        const validObjectId:boolean=
        mongoose.isObjectIdOrHexString(value); //Determinar si el identificador es válido para MongoDB
        if(!validObjectId){
            throw new BadRequestException ('invalid ObjectId!!') //Lanzar una excepción si el identificador no es válido
        }
        return value; //Devolvemos el valor si el identificador es valido Uso del pipe en los controllers
        
    }

}