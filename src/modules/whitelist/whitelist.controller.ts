import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { WhitelistService } from './whitelist.service';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';
import { UpdateWhitelistDto } from './dto/update-whitelist.dto';
import { WhitelistStatus } from './entities/whitelist.entity';

@ApiTags('whitelist')
@Controller('whitelist')
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear una nueva lista de deseos',
    description: 'Crea una nueva lista de deseos para un usuario. Tiempo de respuesta esperado: ~150ms'
  })
  @ApiBody({
    type: CreateWhitelistDto,
    examples: {
      whitelist1: {
        summary: 'Lista de deseos básica',
        value: {
          userId: '657f5cd8e42c0d93c0b0b123',
          productIds: ['657f5cd8e42c0d93c0b0b456'],
          status: 'active'
        }
      },
      whitelist2: {
        summary: 'Lista de deseos con múltiples productos',
        value: {
          userId: '657f5cd8e42c0d93c0b0b123',
          productIds: [
            '657f5cd8e42c0d93c0b0b456',
            '657f5cd8e42c0d93c0b0b457',
            '657f5cd8e42c0d93c0b0b458'
          ],
          status: 'active'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Lista de deseos creada exitosamente. Tiempo de respuesta: ~150ms',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b999',
        userId: '657f5cd8e42c0d93c0b0b123',
        productIds: ['657f5cd8e42c0d93c0b0b456'],
        status: 'active',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  create(@Body() createWhitelistDto: CreateWhitelistDto) {
    return this.whitelistService.create(createWhitelistDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todas las listas de deseos',
    description: 'Retorna todas las listas de deseos. Tiempo de respuesta esperado: ~180ms para <100 listas, ~350ms para >100 listas'
  })
  @ApiResponse({
    status: 200,
    description: 'Listas de deseos obtenidas exitosamente',
    schema: {
      example: [{
        id: '657f5cd8e42c0d93c0b0b999',
        userId: '657f5cd8e42c0d93c0b0b123',
        productIds: ['657f5cd8e42c0d93c0b0b456'],
        status: 'active',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }]
    }
  })
  findAll() {
    return this.whitelistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener una lista de deseos por ID',
    description: 'Busca y retorna una lista de deseos por su ID. Tiempo de respuesta esperado: ~120ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de deseos encontrada exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b999',
        userId: '657f5cd8e42c0d93c0b0b123',
        productIds: ['657f5cd8e42c0d93c0b0b456'],
        status: 'active',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Lista de deseos no encontrada. Tiempo de respuesta: ~50ms' 
  })
  findOne(@Param('id') id: string) {
    return this.whitelistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Actualizar una lista de deseos',
    description: 'Actualiza una lista de deseos existente. Tiempo de respuesta esperado: ~150ms'
  })
  @ApiBody({
    type: UpdateWhitelistDto,
    examples: {
      whitelist1: {
        summary: 'Actualización básica',
        value: {
          status: 'inactive'
        }
      },
      whitelist2: {
        summary: 'Actualización de productos',
        value: {
          productIds: [
            '657f5cd8e42c0d93c0b0b456',
            '657f5cd8e42c0d93c0b0b459'
          ],
          status: 'active'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de deseos actualizada exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b999',
        userId: '657f5cd8e42c0d93c0b0b123',
        productIds: [
          '657f5cd8e42c0d93c0b0b456',
          '657f5cd8e42c0d93c0b0b459'
        ],
        status: 'active',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:35:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Lista de deseos no encontrada. Tiempo de respuesta: ~50ms' 
  })
  update(@Param('id') id: string, @Body() updateWhitelistDto: UpdateWhitelistDto) {
    return this.whitelistService.update(id, updateWhitelistDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar una lista de deseos',
    description: 'Elimina una lista de deseos del sistema. Tiempo de respuesta esperado: ~130ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de deseos eliminada exitosamente',
    schema: {
      example: {
        id: '657f5cd8e42c0d93c0b0b999',
        userId: '657f5cd8e42c0d93c0b0b123',
        productIds: ['657f5cd8e42c0d93c0b0b456'],
        status: 'active',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Lista de deseos no encontrada. Tiempo de respuesta: ~50ms' 
  })
  remove(@Param('id') id: string) {
    return this.whitelistService.remove(id);
  }

  @Get('filter/user/:userId')
  @ApiOperation({ 
    summary: 'Obtener listas de deseos por usuario',
    description: 'Busca y retorna listas de deseos por el ID del usuario. Tiempo de respuesta esperado: ~150ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Listas de deseos encontradas exitosamente',
    schema: {
      example: [{
        id: '657f5cd8e42c0d93c0b0b999',
        userId: '657f5cd8e42c0d93c0b0b123',
        productIds: ['657f5cd8e42c0d93c0b0b456'],
        status: 'active',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }]
    }
  })
  findByUser(@Param('userId') userId: string) {
    return this.whitelistService.findByUser(userId);
  }

  @Get('filter/product/:productId')
  @ApiOperation({ 
    summary: 'Obtener listas de deseos por producto',
    description: 'Busca y retorna listas de deseos por el ID del producto. Tiempo de respuesta esperado: ~150ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Listas de deseos encontradas exitosamente',
    schema: {
      example: [{
        id: '657f5cd8e42c0d93c0b0b999',
        userId: '657f5cd8e42c0d93c0b0b123',
        productIds: ['657f5cd8e42c0d93c0b0b456'],
        status: 'active',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }]
    }
  })
  findByProduct(@Param('productId') productId: string) {
    return this.whitelistService.findByProduct(productId);
  }

  @Get('filter/status/:status')
  @ApiOperation({ 
    summary: 'Obtener listas de deseos por estado',
    description: 'Busca y retorna listas de deseos por su estado. Tiempo de respuesta esperado: ~150ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Listas de deseos encontradas exitosamente',
    schema: {
      example: [{
        id: '657f5cd8e42c0d93c0b0b999',
        userId: '657f5cd8e42c0d93c0b0b123',
        productIds: ['657f5cd8e42c0d93c0b0b456'],
        status: 'active',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }]
    }
  })
  findByStatus(@Param('status') status: WhitelistStatus) {
    return this.whitelistService.findByStatus(status);
  }

  @Get('filter/date')
  @ApiOperation({ 
    summary: 'Obtener listas de deseos por rango de fecha',
    description: 'Busca y retorna listas de deseos por un rango de fechas. Tiempo de respuesta esperado: ~200ms'
  })
  @ApiResponse({
    status: 200,
    description: 'Listas de deseos encontradas exitosamente',
    schema: {
      example: [{
        id: '657f5cd8e42c0d93c0b0b999',
        userId: '657f5cd8e42c0d93c0b0b123',
        productIds: ['657f5cd8e42c0d93c0b0b456'],
        status: 'active',
        createdAt: '2024-12-19T14:30:00.000Z',
        updatedAt: '2024-12-19T14:30:00.000Z'
      }]
    }
  })
  findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.whitelistService.findByDateRange(new Date(startDate), new Date(endDate));
  }
}
