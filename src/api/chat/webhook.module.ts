import { Module } from '@nestjs/common'
import { WebhookController } from './webhook.controller';

@Module({
  controllers: [WebhookController],
  providers: [],
  imports: [],
})
export class WebhookModule {}
