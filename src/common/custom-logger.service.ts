import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  constructor(private configService: ConfigService) {
    super();

    // Obtém o nível de log do .env ou usa 'log'
    const logLevelFromEnv = this.configService.get<string>('LOG_LEVEL');

    // Converte o valor do .env para um array de LogLevel
    const levels: LogLevel[] = ['log', 'error', 'warn'];

    if (logLevelFromEnv) {
      const allLevels: LogLevel[] = ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'];
      const index = allLevels.indexOf(logLevelFromEnv as LogLevel);
      if (index !== -1) {
        this.setLogLevels(allLevels.slice(0, index + 1));
      }
    } else {
      this.setLogLevels(levels);
    }
  }
}
