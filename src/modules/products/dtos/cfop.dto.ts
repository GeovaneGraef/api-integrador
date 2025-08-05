import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CfopDto {
  @IsString()
  @ApiProperty()
  uf: string;

  @IsNumber()
  @ApiProperty()
  codigo: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  nop: string | null;

  @IsString()
  @ApiProperty()
  tipo: string;

  @IsString()
  @ApiProperty()
  origem: string;
}
