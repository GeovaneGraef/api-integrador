import { Module } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: (configService: ConfigService) => {
        // As credenciais estão no .env
        const projectId = configService.get<string>('GCP_PROJECT_ID');
        const keyFilename = configService.get<string>('GCP_KEY_FILENAME');

        if (!projectId || !keyFilename) {
          throw new Error('As credenciais do PubSub não foram configuradas no .env');
        }

        return new PubSub({
          projectId,
          keyFilename,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
