import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [BooksModule, UsersModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/bookshop')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
