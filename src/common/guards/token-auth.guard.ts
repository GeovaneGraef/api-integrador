import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers['token'] as string;

    if (!token) {
      throw new UnauthorizedException('Token não informado');
    }

    // Valide o token aqui (ex: buscar no banco, comparar com chave fixa etc)
    if (token !== this.configService.get<string>('TOKEN')) {
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }
}
