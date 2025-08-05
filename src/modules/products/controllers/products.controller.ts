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
    example: 'sad321asd321a32s1d321a',
  })
  @ApiBody({ type: ProductDto })
  @UseGuards(TokenAuthGuard)
  async createProducts(@Body(new ValidationPipe()) productData: ProductDto) {
    // Se a validação passar, o body da requisição está tipado
    await this.productsService.sendDataMessages(productData);
    return productData;
  }

  @Get()
  @ApiHeader({
    name: 'token',
    description: 'Token de autenticação',
    required: true,
    example: 'sad321asd321a32s1d321a',
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

    const data = await this.productsService.getProductsMessage();
    return data;
  }
}
