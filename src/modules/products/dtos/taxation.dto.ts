import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class TaxationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  cnpj: string | null;

  @IsString()
  @ApiProperty()
  @IsOptional()
  uf: string | null;

  @IsString()
  @ApiProperty()
  tipo: string;

  @IsString()
  @ApiProperty()
  cst: string;

  @IsNumber()
  @ApiProperty()
  aliquota: number;

  @IsNumber()
  @ApiProperty()
  reducao: number;

  @IsNumber()
  @ApiProperty()
  aliqDesoneracao: number;

  @IsString()
  @ApiProperty()
  codNatReceita: string;
}
