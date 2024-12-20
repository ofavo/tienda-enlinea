import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear una nueva categoría',
    description: 'Crea una nueva categoría en el sistema. Tiempo de respuesta esperado: ~120ms'
  })
  @ApiBody({
    type: CreateCategoryDto,
    examples: {
      category1: {
        summary: 'Categoría básica',
        value: {
          name: 'Electrónicos',
          description: 'Productos electrónicos y gadgets'
        }
      },
      category2: {
        summary: 'Categoría con descripción detallada',
        value: {
          name: 'Smartphones',
          description: 'Teléfonos inteligentes de última generación, incluye Android e iOS'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente. Tiempo de respuesta: ~120ms',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b789',
        name: 'Electrónicos',
        description: 'Productos electrónicos y gadgets',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todas las categorías',
    description: 'Retorna la lista de todas las categorías. Tiempo de respuesta esperado: ~100ms para <50 categorías, ~200ms para >50 categorías'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías obtenida exitosamente',
    schema: {
      example: [{
        id: '657f5cd8e42c0d93c0b0b789',
        name: 'Electrónicos',
        description: 'Productos electrónicos y gadgets',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }]
    }
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener una categoría por ID',
    description: 'Busca y retorna una categoría por su ID. Tiempo de respuesta esperado: ~80ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b789',
        name: 'Electrónicos',
        description: 'Productos electrónicos y gadgets',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Categoría no encontrada. Tiempo de respuesta: ~40ms' 
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar una categoría',
    description: 'Actualiza los datos de una categoría existente. Tiempo de respuesta esperado: ~100ms'
  })
  @ApiBody({
    type: UpdateCategoryDto,
    examples: {
      category1: {
        summary: 'Actualización básica',
        value: {
          description: 'Nueva descripción de la categoría'
        }
      },
      category2: {
        summary: 'Actualización completa',
        value: {
          name: 'Smartphones y Tablets',
          description: 'Dispositivos móviles incluyendo smartphones y tablets'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b789',
        name: 'Smartphones y Tablets',
        description: 'Dispositivos móviles incluyendo smartphones y tablets',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:35:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Categoría no encontrada. Tiempo de respuesta: ~40ms' 
  })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar una categoría',
    description: 'Elimina una categoría del sistema. Tiempo de respuesta esperado: ~120ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b789',
        name: 'Electrónicos',
        description: 'Productos electrónicos y gadgets',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Categoría no encontrada. Tiempo de respuesta: ~40ms' 
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
