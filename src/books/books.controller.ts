import { Req } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; //Decorador de OpenAPI para agrupar los endpoints en Swagger UI
import { Request } from 'express'; // uso de objetos request
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ParseObjectIdPipe } from 'utilities/parse-object-id-pipe.pipe';
import { CreateCommentDto } from './dto/create-comment-dto';

@Controller('books')
@ApiTags('book') //Agrupar los endpoints para una etiqueta en Swagger UI

export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Req() request: Request) {  // incluyo un parámetro con un objeto Request para acceder a los parámetros de la consulta en la URL
    return this.booksService.findAll(request); 
  }

  @Get(':id')
  findOne(@Param('id',ParseObjectIdPipe) id: string) { //Uso de ParseObjectIdPipe para la búsqueda de un libro
    return this.booksService.findOne(id); 
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateBookDto: UpdateBookDto) { //Uso de ParseObjectIdPipe para la búsqueda de un libro
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) { //Uso de ParseObjectIdPipe para la búsqueda de un libro
    return this.booksService.remove(id);
  }

  @Post(':id/comment') //Ruta para añadir los comentarios
  async addComent(
    @Param ('id', ParseObjectIdPipe) id:string, // Captura del parámetro y paso por el pipe de comprobación de identificadores de MongoDB
    @Body() comment: CreateCommentDto, // 	Paso del comentario en el cuerpo de la petición
  ){
    return this.booksService.addComment(id, comment); // Llamada al método de incorporación de comentarios

  }
}