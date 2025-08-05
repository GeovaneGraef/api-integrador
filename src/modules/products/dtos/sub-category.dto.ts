import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from './category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SubCategoryDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  descricao: string;

  @ApiProperty({ type: () => CategoryDto })
  @ValidateNested()
  @Type(() => CategoryDto)
  categoria: CategoryDto;
}
