import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { Request } from 'express';


@Injectable()
export class BooksService {
  constructor( 
    @InjectModel(Book.name) private readonly bookModel:
    Model <BookDocument> //Definir el modelo para libros mediante inyeccion de dependencias
  ){}


  async create(createBookDto: CreateBookDto) : Promise<Book> {
    return this.bookModel.create(createBookDto);//Lamada almetodo de creacion de documentos
  }

  async findAll(request:Request) : Promise <Book[]>{  //Devolvemos con Promise <Book[]> la lista entera de libros y añadimos un parametro Request para acceder a los parametros de la consulta pasados en la URL
    return this.bookModel
    .find(request.query) //Llamada al método de búsqueda de documentos pasándole los parámetros de la consulta
    .populate({ path: 'comments.username' }) //incorporacion de datos de usuario
    .setOptions({sanitizeFilter:true}) //Configuración para evitar la inyección de código malicioso
    .exec();
  }

  async findOne(id: string) : Promise <Book> {  //Cambio del tipo id a string para adaptarlo al _id de MongoDB  y que devuelva Promise<Book> con el libro buscado
    return this.bookModel.
    findOne({ _id: id }) //llamada al metodo de busqueda de un documento por id
    .populate({path:'comments.username'}) //incorporacion de datos de usuario
    .exec()

  }

  async update(id: string, updateBookDto: UpdateBookDto):
   Promise<Book> { 
    return this.bookModel.findOneAndUpdate({ _id: id }, updateBookDto, { 
      new: true,   // de forma predeterminada el metodo findOneAndUdpdate devuelve el objeto original, no modificado. para que devuelva el obj ya modificado hay que pasar al metodo la opcion de {new:true}
    });     //devuelve el libro modificado 
  }

  async remove(id: string) {
    return this.bookModel.findOneAndDelete({_id: id}). exec() ;


  }

  async addComment(id: string, comment: any) { //metodo para añadir el comentario al libro
    let book: BookDocument = await this.bookModel.findById(id); // Recuperar el libro por su identificador
    book.comments.push(comment);  // Añadimos el comentario al array de comentarios
    book.save(); // Guardar el libro
    return book;
  }
}


