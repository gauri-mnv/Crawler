/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
// import axios from 'axios';

@Controller('scrape')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. GET Method: Jab aap pehli baar page kholenge (localhost:4005/scrape/Headlines)
  @Get('Headlines')
  // @Render('index') // index.ejs file ko render karega
  getForm() {
    try {
      return {
        headlines: [],
        nextPageOptions: [],
        paragraphs: [],
        stats: { totalHeadlines: 0, totalLinksFound: 0, totalParagraphs: 0 },
      };
    } catch (error) {
      console.log(error);
      return error;
    }
    // Shuruat mein hamare paas koi data nahi hai, isliye empty objects bhej rahe hain
  }
  // 2. POST Method: Jab aap 'Scrape Now' button dabayenge
  @Post('addHeadlines')
  // @Render('index')
  async postForm(@Body('target') target: string) {
    try {
      // @Body('target') wahi naam hai jo aapne HTML input ke 'name' attribute mein diya hai
      if (!target || !target.startsWith('http')) {
        return {
          url: target,
          headlines: [],
          nextPageOptions: [],
          paragraphs: [],
          stats: { totalHeadlines: 0, totalLinksFound: 0, totalParagraphs: 0 },
          errorMessage: 'Invalid URL! Please include http:// or https://',
        };
      }

      const data = await this.appService.getTitle(target);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
