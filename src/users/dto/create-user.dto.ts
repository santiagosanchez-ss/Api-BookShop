import { ApiProperty } from "@nestjs/swagger";



export class CreateUserDto {
    @ApiProperty({
        example: 'RubenSanchez'    
    }) //Decorador para definir una propiedad para la documentación en Swagger OpenAPI
    readonly _id: string; //Definicion de campo 

    @ApiProperty({
        example: 'Ruben Sanchez'
    })
    readonly name: string;

    @ApiProperty({
        example: 'RubenSanchez@hotmail.com'
    })
    readonly email: string;

    @ApiProperty({
        example: 'Argentina'
    })
    readonly country: string;

}
