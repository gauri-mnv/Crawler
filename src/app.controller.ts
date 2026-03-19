import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('scrape')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // This creates a route: GET /scrape?url=...
  @Get('Headlines')
  async fetchTitle(@Query('target') target: string) {
    return await this.appService.getTitle(target);
  }
}
