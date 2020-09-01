import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { WebhookModule } from './api/chat/webhook.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [SocketModule, WebhookModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
