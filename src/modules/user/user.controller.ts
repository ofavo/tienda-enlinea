import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo usuario',
    description: 'Crea un nuevo usuario en el sistema. Tiempo de respuesta esperado: ~200ms'
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      user1: {
        summary: 'Usuario básico',
        value: {
          username: 'john.doe',
          email: 'john.doe@example.com',
          password: 'SecurePass123!'
        }
      },
      user2: {
        summary: 'Usuario con datos completos',
        value: {
          username: 'jane.smith',
          email: 'jane.smith@example.com',
          password: 'StrongPass456!',
          firstName: 'Jane',
          lastName: 'Smith'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario creado exitosamente. Tiempo de respuesta: ~200ms',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b123',
        username: 'john.doe',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los usuarios',
    description: 'Retorna la lista de todos los usuarios. Tiempo de respuesta esperado: ~150ms para <100 usuarios, ~300ms para >100 usuarios'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuarios obtenida exitosamente',
    schema: {
      example: [{
        id: '657f5cd8e42c0d93c0b0b123',
        username: 'john.doe',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }]
    }
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un usuario por ID',
    description: 'Busca y retorna un usuario por su ID. Tiempo de respuesta esperado: ~100ms'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario encontrado exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b123',
        username: 'john.doe',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado. Tiempo de respuesta: ~50ms' 
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar un usuario',
    description: 'Actualiza los datos de un usuario existente. Tiempo de respuesta esperado: ~150ms'
  })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      user1: {
        summary: 'Actualización básica',
        value: {
          email: 'nuevo.email@example.com'
        }
      },
      user2: {
        summary: 'Actualización completa',
        value: {
          email: 'jane.updated@example.com',
          firstName: 'Jane Updated',
          lastName: 'Smith Updated'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario actualizado exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b123',
        username: 'john.doe',
        email: 'nuevo.email@example.com',
        firstName: 'John Updated',
        lastName: 'Doe Updated',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:35:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado. Tiempo de respuesta: ~50ms' 
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un usuario',
    description: 'Elimina un usuario del sistema. Tiempo de respuesta esperado: ~150ms'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario eliminado exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b123',
        username: 'john.doe',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado. Tiempo de respuesta: ~50ms' 
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
