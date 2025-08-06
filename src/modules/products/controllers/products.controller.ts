import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TokenAuthGuard } from 'src/common/guards/token-auth.guard';
import { ProductDto } from '../dtos/product.dto';
import { ProductsService } from '../services/products.service';
import { ApiBody, ApiHeader } from '@nestjs/swagger';

@Controller('wsemsys/redesim/produto')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);
  constructor(private readonly productsService: ProductsService) {}

  @Put()
  @ApiHeader({
    name: 'token',
    description: 'Token de autenticação',
    required: true,
  })
  @ApiBody({ type: ProductDto })
  @UseGuards(TokenAuthGuard)
  async createProducts(@Body(new ValidationPipe()) productData: ProductDto[]) {
    await this.productsService.testConnection('test-2025-08-06-0ce73f65-7fe7-4630-8d31-a0570fd92c55');
    return productData;
  }

  @Get()
  @ApiHeader({
    name: 'token',
    description: 'Token de autenticação',
    required: true,
  })
  @ApiHeader({
    name: 'idMessage',
    description: 'ID Message',
    required: true,
    example: '0ff2329f-f746-4280-9f87-7b1c48b84de5',
  })
  @UseGuards(TokenAuthGuard)
  async getProducts(@Query('limit') limit: number, @Headers('idmessage') idMessage: string) {
    //  define valor padrão se não informado ou define 10 caso não encontre
    const parsedLimit = limit || 10;

    // caso não seja informado
    if (!idMessage) {
      throw new BadRequestException('Header "idMessage" é obrigatório');
    }

    //const data = await this.productsService.getProductsMessage();
    const data = null;
    return data;
  }
}
