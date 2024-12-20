import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo producto',
    description: 'Crea un nuevo producto en el sistema. Tiempo de respuesta esperado: ~180ms'
  })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      product1: {
        summary: 'Producto básico',
        value: {
          name: 'iPhone 15 Pro',
          description: 'Último modelo de iPhone',
          price: 999.99,
          stock: 50,
          categoryId: '657f5cd8e42c0d93c0b0b789'
        }
      },
      product2: {
        summary: 'Producto con detalles',
        value: {
          name: 'MacBook Pro M3',
          description: 'Laptop Apple con chip M3, 16GB RAM, 512GB SSD',
          price: 1999.99,
          stock: 25,
          categoryId: '657f5cd8e42c0d93c0b0b789'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado exitosamente. Tiempo de respuesta: ~180ms',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b456',
        name: 'iPhone 15 Pro',
        description: 'Último modelo de iPhone',
        price: 999.99,
        stock: 50,
        categoryId: '657f5cd8e42c0d93c0b0b789',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los productos',
    description: 'Retorna la lista de todos los productos. Tiempo de respuesta esperado: ~200ms para <1000 productos, ~400ms para >1000 productos'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente',
    schema: {
      example: [{
        id: '657f5cd8e42c0d93c0b0b456',
        name: 'iPhone 15 Pro',
        description: 'Último modelo de iPhone',
        price: 999.99,
        stock: 50,
        categoryId: '657f5cd8e42c0d93c0b0b789',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }]
    }
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener un producto por ID',
    description: 'Busca y retorna un producto por su ID. Tiempo de respuesta esperado: ~100ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b456',
        name: 'iPhone 15 Pro',
        description: 'Último modelo de iPhone',
        price: 999.99,
        stock: 50,
        categoryId: '657f5cd8e42c0d93c0b0b789',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Producto no encontrado. Tiempo de respuesta: ~50ms' 
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Actualizar un producto',
    description: 'Actualiza los datos de un producto existente. Tiempo de respuesta esperado: ~150ms'
  })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      product1: {
        summary: 'Actualización básica',
        value: {
          price: 899.99,
          stock: 45
        }
      },
      product2: {
        summary: 'Actualización completa',
        value: {
          name: 'iPhone 15 Pro Max',
          description: 'Versión actualizada del iPhone 15 Pro',
          price: 1099.99,
          stock: 30,
          categoryId: '657f5cd8e42c0d93c0b0b789'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b456',
        name: 'iPhone 15 Pro Max',
        description: 'Versión actualizada del iPhone 15 Pro',
        price: 1099.99,
        stock: 30,
        categoryId: '657f5cd8e42c0d93c0b0b789',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:35:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Producto no encontrado. Tiempo de respuesta: ~50ms' 
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar un producto',
    description: 'Elimina un producto del sistema. Tiempo de respuesta esperado: ~150ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b456',
        name: 'iPhone 15 Pro',
        description: 'Último modelo de iPhone',
        price: 999.99,
        stock: 50,
        categoryId: '657f5cd8e42c0d93c0b0b789',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Producto no encontrado. Tiempo de respuesta: ~50ms' 
  })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
