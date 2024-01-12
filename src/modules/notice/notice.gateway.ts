import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { NoticeService } from './notice.service';
import { Server } from 'http';

@WebSocketGateway({
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
  },
})
export class NoticeGateway {
  constructor(private readonly noticeService: NoticeService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('findAllNotice')
  findAll() {
    return this.noticeService.findAll();
  }
}
