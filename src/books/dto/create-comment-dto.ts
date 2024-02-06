import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas/user.schema';


export class CreateCommentDto{
    @ApiProperty({example:'bueno para un comienzo'})
    readonly title: string;

    @ApiProperty({example:5})
    readonly stars: number;

    @ApiProperty({example: 'para dar inicio a los estudios de programacion me parece un libro adecuado y cumple con lo que promete, ser una introduccion'})
    readonly comment : string;

    @ApiProperty({example:'RubenSanchez'})
    readonly username: User;

}