import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'iPhone 15 Pro Max'
  })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Smartphone Apple con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR'
  })
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99,
    minimum: 0
  })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 50,
    minimum: 0
  })
  stock: number;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto',
    example: '657f5cd8e42c0d93c0b0b123'
  })
  categoryId: string;
}
