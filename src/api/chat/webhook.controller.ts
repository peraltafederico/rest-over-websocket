import { Controller, Post, Body } from '@nestjs/common'
import { SocketService } from 'src/socket/socket.service'

@Controller('/webhook')
export class WebhookController {

  constructor(private readonly socketService: SocketService) { }

  @Post('/')
  webhook(@Body() { message }: { message: string }): any {

    this.socketService.socket.emit('server', message);
  }
}
