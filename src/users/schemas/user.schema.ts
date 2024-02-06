import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; //importacion de Document de Mongoose

export type UserDocument = User & Document; // Definicion del tipo de un documento usuario 

@Schema() //Decorador para crear una colección MongoDB para la clase
export class User {
   
    @Prop() //Decorador para añadir un campo a la coleccion 
    // _id:string; //Gestión propia del _id. Guardaremos el login, y nos aseguraremos de que sea único.
     
     @Prop()
     name:string;

     @Prop()
     email:string;

     @Prop()
     country:string;

}

export const UserSchema= SchemaFactory.createForClass (User); //Esquema Mongoose creado a partir de la clase User

