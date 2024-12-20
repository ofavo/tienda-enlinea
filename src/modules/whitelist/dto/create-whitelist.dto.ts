import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WhitelistStatus } from '../entities/whitelist.entity';

export class CreateWhitelistDto {
  @ApiProperty({
    description: 'ID del usuario propietario de la lista de deseos',
    example: '657f5cd8e42c0d93c0b0b456'
  })
  user: string;

  @ApiProperty({
    description: 'Lista de IDs de productos en la lista de deseos',
    example: ['657f5cd8e42c0d93c0b0b123', '657f5cd8e42c0d93c0b0b124'],
    type: [String]
  })
  products: string[];

  @ApiPropertyOptional({
    description: 'Estado de la lista de deseos',
    enum: WhitelistStatus,
    example: WhitelistStatus.ACTIVE,
    default: WhitelistStatus.ACTIVE
  })
  status?: WhitelistStatus;
}
