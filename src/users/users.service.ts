import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Request } from 'express'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, //Definir el modelo para User mediante inyeccion de dependencias
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> { //Cambiar a async y que devuelva Promise<User> con el usuario creado
    return this.userModel.create(createUserDto);  //Llamada al metodo de creacion de documento
  }

  async findAll(request: Request): Promise<User[]> { //Cambiar a async y que devuelva Promise<User[]> con la lista de usuarios
    return this.userModel
      .find(request.query) 
      .setOptions({ sanitizeFilter: true }) 
      .exec();
  }

  async findOne(id: string): Promise<User> { //Cambio del tipo id a string para adaptarlo al _id de MongoDB,
    return this.userModel.findOne({ _id: id }).exec(); //Llamada al metodo de busqueda de un documento por id
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> { //Cambio del tipo id a string para adaptarlo al _id de MongoDB
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, { //	Llamada al método de actualización de documentos por id pasándole el JSON con las modificaciones
      new: true, //Opcion para que devuelva el objeto modificado
    });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete({ _id: id }).exec() //Llamada al método de eliminación de documentos por id
  }
}