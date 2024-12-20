import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'john.doe',
    minLength: 3
  })
  username: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john.doe@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'MySecurePass123!',
    minLength: 8,
    format: 'password'
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Nombre del usuario',
    example: 'John'
  })
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Apellido del usuario',
    example: 'Doe'
  })
  lastName?: string;
}
