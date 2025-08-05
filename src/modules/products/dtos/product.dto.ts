import { IsNumber, IsString, IsOptional, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UnitDto } from './unit.dto';
import { SubCategoryDto } from './sub-category.dto';
import { CfopDto } from './cfop.dto';
import { TaxationDto } from './taxation.dto';
import { CRecipDto } from './crecip.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  codSelcon: string | null;

  @IsString()
  @ApiProperty()
  codBarra: string;

  @IsString()
  @ApiProperty()
  tipo: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  tipoServico: string | null;

  @IsString()
  descricao: string;

  @ApiProperty({ type: () => UnitDto })
  @ValidateNested()
  @Type(() => UnitDto)
  unidade: UnitDto;

  @ApiProperty({ type: () => SubCategoryDto })
  @ValidateNested()
  @Type(() => SubCategoryDto)
  subcategoria: SubCategoryDto;

  @IsString()
  marca: string;

  @IsString()
  @IsOptional()
  dtaCadastro: string | null;

  @IsString()
  @ApiProperty()
  ncm: string;

  @IsString()
  @ApiProperty()
  cest: string;

  @ApiProperty({ type: () => CfopDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CfopDto)
  cfop: CfopDto[];

  @IsBoolean()
  @ApiProperty()
  solicitaVendedor: boolean;

  @IsString()
  @IsOptional()
  anp: string | null;

  @IsBoolean()
  @ApiProperty()
  combustivel: boolean;

  @ApiProperty({ type: () => TaxationDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaxationDto)
  tributacoes: TaxationDto[];

  @IsBoolean()
  @ApiProperty()
  escalaRelevante: boolean;

  @IsString()
  @ApiProperty()
  cnpjFabricante: string;

  @IsString()
  @ApiProperty()
  nomeFabricante: string;

  @IsNumber()
  @ApiProperty()
  perGLP: number;

  @IsNumber()
  @ApiProperty()
  perGNNacional: number;

  @IsNumber()
  @ApiProperty()
  perGNImportado: number;

  @IsArray()
  @ApiProperty()
  cartoesCombustivel: any[];

  @ApiProperty({ type: () => CRecipDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CRecipDto)
  cBenef: CRecipDto[];

  @IsBoolean()
  @ApiProperty()
  destacaICMSSt: boolean;

  @IsArray()
  @ApiProperty()
  tribIcmsMonofasica: any[];

  @IsNumber()
  @ApiProperty()
  versao: number;

  @IsBoolean()
  @ApiProperty()
  exclusao: boolean;

  @IsString()
  @ApiProperty()
  codigoRti: string;
}
