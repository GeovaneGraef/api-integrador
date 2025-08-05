import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CRecipDto {
  @IsString()
  @ApiProperty()
  ncm: string;

  @IsString()
  @ApiProperty()
  uf: string;

  @IsString()
  @ApiProperty()
  cst: string;

  @IsString()
  @ApiProperty()
  codigo: string;
}
