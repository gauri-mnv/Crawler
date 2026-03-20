import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('scrape')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. GET Method: Jab aap pehli baar page kholenge (localhost:4005/scrape/Headlines)
  @Get('Headlines')
  @Render('index') // index.ejs file ko render karega
  getForm() {
    // Shuruat mein hamare paas koi data nahi hai, isliye empty objects bhej rahe hain
    return {
      headlines: [],
      nextPageOptions: [],
      stats: { totalHeadlines: 0, totalLinksFound: 0 },
    };
  }
  // 2. POST Method: Jab aap 'Scrape Now' button dabayenge
  @Post('Headlines')
  @Render('index')
  async postForm(@Body('target') target: string) {
    // @Body('target') wahi naam hai jo aapne HTML input ke 'name' attribute mein diya hai
    if (!target) {
      return {
        headlines: [],
        nextPageOptions: [],
        stats: { totalHeadlines: 0, totalLinksFound: 0 },
      };
    }

    const data = await this.appService.getTitle(target);
    return data;
  }
}
