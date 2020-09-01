import { SubscribeMessage, WebSocketGateway, OnGatewayInit, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger, Injectable } from '@nestjs/common';
import { Connection } from './types';
import { Client, Server } from 'socket.io';
import { remove } from 'lodash';
import { SocketService } from './socket/socket.service';

@Injectable()
@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger("AppGateway")

  connections: Connection[]

  constructor(private socketService: SocketService) {
    this.connections = []
  }

  afterInit(server: Server) {
    this.logger.log("init")

    this.socketService.socket = server;
  }

  handleDisconnect(client: Client) {
    this.logger.log(`client disconnected: ${client.id}`)

    remove(this.connections, connection => connection.id === client.id)

    this.logger.log(this.connections, 'Connections')
  }

  handleConnection(client, ...args: any[]) {
    this.logger.log(`client connected: ${client.id}`)

    this.connections.push({
      id: client.id,
      userId: '1'
    })

    this.logger.log(this.connections, 'Connections')
  }

  @SubscribeMessage('client')
  handleMessage(@MessageBody() text: string) {
    this.logger.log(`message ${text}`)
  }
}
