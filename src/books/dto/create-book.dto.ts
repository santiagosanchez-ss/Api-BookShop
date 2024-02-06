import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty({
        example: 'Guía Users 12: Programación Básica '
    })//	Decorador para definir una propiedad para la documentación en Swagger OpenAPI
    readonly title: string;//definicion de campo 

    @ApiProperty({
        example: ' informatica '
    })
    readonly genre: string;

    @ApiProperty({
        example: 'Guía Users 12: Programación Básica '
    })
    readonly description: string;

    @ApiProperty({ example: 'Leonel Saafigueroa' })
    readonly author: string;

    @ApiProperty({ example: 144 })
    readonly pages: number;

    @ApiProperty({
        example: 'https://http2.mlstatic.com/D_NQ_NP_878357-MLA48698065689_122021-O.webp',
    })
    readonly image_url: string;

    @ApiProperty({ example: ['libros','programacion'] }) //ejemplo con un array
  readonly keywords: string[];















}
