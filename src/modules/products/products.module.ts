import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { TokenAuthGuard } from 'src/common/guards/token-auth.guard';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './services/products.service';
import { PubSubModule } from './pubsub.module';

@Module({
  imports: [HttpModule, PubSubModule],
  controllers: [ProductsController],
  providers: [TokenAuthGuard, ProductsService],
})
export class ProductsModule {}
