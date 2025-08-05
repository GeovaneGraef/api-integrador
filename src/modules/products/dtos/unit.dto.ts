import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UnitDto {
  @IsString()
  @ApiProperty()
  sigla: string;

  @IsString()
  @ApiProperty()
  descricao: string;
}
