import { Module } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: (configService: ConfigService) => {
        const projectId = configService.get<string>('GCP_PROJECT_ID');
        const keyFilename = configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS');

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
