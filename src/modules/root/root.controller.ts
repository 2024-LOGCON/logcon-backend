import { Controller, Get } from '@nestjs/common';
import { RootService } from './root.service';

@Controller('')
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Get()
  findAll() {
    return this.rootService.getHello();
  }
}
