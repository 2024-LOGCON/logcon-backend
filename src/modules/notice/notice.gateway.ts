import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { NoticeService } from './notice.service';

@WebSocketGateway({
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
  },
})
export class NoticeGateway {
  constructor(private readonly noticeService: NoticeService) {}

  @SubscribeMessage('findAllNotice')
  findAll() {
    return this.noticeService.findAll();
  }
}
