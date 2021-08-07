import { Controller, Get } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
  @Get()
  getHelloWorld() {
    return 'Hello World!';
  }
}
